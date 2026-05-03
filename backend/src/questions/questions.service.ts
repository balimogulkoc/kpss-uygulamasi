import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getSubjects() {
    return this.prisma.subject.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
      include: { _count: { select: { questions: true } } },
    });
  }

  async getTopics(subjectId?: number) {
    return this.prisma.topic.findMany({
      where: { isActive: true, ...(subjectId ? { subjectId } : {}) },
      orderBy: { orderIndex: 'asc' },
      include: { _count: { select: { questions: true } } },
    });
  }

  async getTopic(id: number) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: { _count: { select: { questions: true } } },
    });
    if (!topic) throw new NotFoundException('Topic not found');
    return topic;
  }

  async getQuestions(filter: {
    subjectId?: number;
    topicId?: number;
    difficulty?: string;
    year?: number;
    limit?: number;
    offset?: number;
    random?: boolean;
  }) {
    const { subjectId, topicId, difficulty, year, limit = 20, offset = 0, random } = filter;

    const where: any = { isActive: true };
    if (subjectId) where.subjectId = subjectId;
    if (topicId) where.topicId = topicId;
    if (difficulty) where.difficulty = difficulty.toUpperCase();
    if (year) where.year = year;

    const total = await this.prisma.question.count({ where });

    let questions;
    if (random) {
      // Random selection via raw query for performance
      const ids = await this.prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM questions
        WHERE is_active = true
        ${subjectId ? `AND subject_id = ${subjectId}` : ''}
        ORDER BY RANDOM()
        LIMIT ${limit}
      `;
      questions = await this.prisma.question.findMany({
        where: { id: { in: ids.map((r) => r.id) } },
        include: { subject: true, topic: true },
      });
    } else {
      questions = await this.prisma.question.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { subject: true, topic: true },
      });
    }

    return { data: questions, total, limit, offset };
  }

  async getQuestion(id: string) {
    const q = await this.prisma.question.findUnique({
      where: { id },
      include: { subject: true, topic: true },
    });
    if (!q) throw new NotFoundException('Soru bulunamadı.');
    return q;
  }

  async getSolution(id: string) {
    const q = await this.prisma.question.findUnique({
      where: { id },
      select: { id: true, explanation: true, correctAnswer: true, options: true },
    });
    if (!q) throw new NotFoundException('Soru bulunamadı.');
    return q;
  }

  async recordAnswer(
    userId: string,
    questionId: string,
    answer: string,
    timeSpentSec: number,
    sessionId?: string,
  ) {
    const question = await this.prisma.question.findUnique({ where: { id: questionId } });
    if (!question) throw new NotFoundException('Soru bulunamadı.');

    const isCorrect = answer === question.correctAnswer;

    const userAnswer = await this.prisma.userAnswer.create({
      data: { userId, questionId, answer, isCorrect, timeSpentSec, sessionId },
    });

    // Update streak & XP
    if (isCorrect) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 10 } },
      });
    }

    return { isCorrect, correctAnswer: question.correctAnswer, userAnswer };
  }

  async getUserStats(userId: string) {
    const answers = await this.prisma.userAnswer.findMany({
      where: { userId },
      include: { question: { select: { subjectId: true, topicId: true } } },
    });

    const total = answers.length;
    const correct = answers.filter((a) => a.isCorrect).length;
    const wrong = total - correct;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    // Per-subject breakdown
    const subjectMap: Record<number, { correct: number; total: number }> = {};
    for (const a of answers) {
      const sid = a.question.subjectId;
      if (!subjectMap[sid]) subjectMap[sid] = { correct: 0, total: 0 };
      subjectMap[sid].total++;
      if (a.isCorrect) subjectMap[sid].correct++;
    }

    return { total, correct, wrong, accuracy, subjectBreakdown: subjectMap };
  }

  async getWeakTopics(userId: string) {
    const answers = await this.prisma.userAnswer.findMany({
      where: { userId },
      include: {
        question: { select: { topicId: true, topic: { select: { name: true, subject: { select: { name: true } } } } } },
      },
    });

    const topicMap: Record<number, { correct: number; total: number; name: string; subjectName: string }> = {};
    for (const a of answers) {
      const tid = a.question.topicId;
      if (!tid || !a.question.topic) continue;
      if (!topicMap[tid]) {
        topicMap[tid] = {
          correct: 0, total: 0,
          name: a.question.topic.name,
          subjectName: a.question.topic.subject.name,
        };
      }
      topicMap[tid].total++;
      if (a.isCorrect) topicMap[tid].correct++;
    }

    return Object.entries(topicMap)
      .map(([id, v]) => ({
        topicId: Number(id),
        topicName: v.name,
        subjectName: v.subjectName,
        accuracy: v.total > 0 ? (v.correct / v.total) * 100 : 0,
        total: v.total,
      }))
      .filter((t) => t.accuracy < 60 && t.total >= 3)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 10);
  }
}