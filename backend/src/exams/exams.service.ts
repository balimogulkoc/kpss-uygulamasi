import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async getExams(filter: { type?: string; isPremium?: boolean } = {}) {
    const where: any = { isActive: true };
    if (filter.type) where.type = filter.type;
    if (filter.isPremium !== undefined) where.isPremium = filter.isPremium;

    const exams = await this.prisma.exam.findMany({
      where,
      include: { _count: { select: { items: true, sessions: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return { data: exams, total: exams.length };
  }

  async getExam(examId: string, userId: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: {
        items: {
          orderBy: { orderIndex: 'asc' },
          include: { question: { include: { subject: true, topic: true } } },
        },
      },
    });
    if (!exam) throw new NotFoundException('Sınav bulunamadı.');

    if (exam.isPremium) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user?.subscriptionStatus !== 'active') {
        throw new ForbiddenException('Bu sınava erişmek için Premium üyelik gereklidir.');
      }
    }

    return exam;
  }

  async startSession(examId: string, userId: string) {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) throw new NotFoundException('Sınav bulunamadı.');

    const totalQ = await this.prisma.examItem.count({ where: { examId } });
    const session = await this.prisma.examSession.create({
      data: {
        userId,
        examId,
        type: exam.type,
        status: 'in_progress',
        totalQ,
      },
    });

    return session;
  }

  async submitAnswer(
    sessionId: string,
    questionId: string,
    answer: string | null,
    timeSpentSec: number,
    userId: string,
  ) {
    const session = await this.prisma.examSession.findUnique({ where: { id: sessionId } });
    if (!session || session.userId !== userId) throw new NotFoundException('Oturum bulunamadı.');
    if (session.status !== 'in_progress') throw new ForbiddenException('Oturum tamamlanmış.');

    if (!answer) return { skipped: true };

    const question = await this.prisma.question.findUnique({ where: { id: questionId } });
    if (!question) throw new NotFoundException('Soru bulunamadı.');

    const isCorrect = answer === question.correctAnswer;

    await this.prisma.userAnswer.create({
      data: { userId, questionId, answer, isCorrect, timeSpentSec, sessionId },
    });

    return { isCorrect, correctAnswer: question.correctAnswer };
  }

  async finishSession(sessionId: string, userId: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
      include: { answers: true },
    });
    if (!session || session.userId !== userId) throw new NotFoundException('Oturum bulunamadı.');

    const correct = session.answers.filter((a) => a.isCorrect).length;
    const wrong = session.answers.filter((a) => !a.isCorrect).length;
    const total = session.totalQ;
    const empty = total - correct - wrong;
    const score = total > 0 ? (correct / total) * 100 : 0;

    const updated = await this.prisma.examSession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        correctQ: correct,
        wrongQ: wrong,
        emptyQ: empty,
        score,
        completedAt: new Date(),
        timeTakenSec: session.answers.reduce((sum, a) => sum + a.timeSpentSec, 0),
      },
    });

    // Award XP
    await this.prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: Math.round(score) } },
    });

    return updated;
  }

  async getSessionResult(sessionId: string, userId: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: {
          include: { question: { include: { subject: true, topic: true } } },
        },
        exam: true,
      },
    });
    if (!session || session.userId !== userId) throw new NotFoundException('Oturum bulunamadı.');
    return session;
  }

  async getUserSessions(userId: string) {
    return this.prisma.examSession.findMany({
      where: { userId },
      include: { exam: { select: { title: true, type: true } } },
      orderBy: { startedAt: 'desc' },
      take: 20,
    });
  }
}