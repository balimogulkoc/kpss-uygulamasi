"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let QuestionsService = class QuestionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSubjects() {
        return this.prisma.subject.findMany({
            where: { isActive: true },
            orderBy: { orderIndex: 'asc' },
            include: { _count: { select: { questions: true } } },
        });
    }
    async getTopics(subjectId) {
        return this.prisma.topic.findMany({
            where: { isActive: true, ...(subjectId ? { subjectId } : {}) },
            orderBy: { orderIndex: 'asc' },
            include: { _count: { select: { questions: true } } },
        });
    }
    async getTopic(id) {
        const topic = await this.prisma.topic.findUnique({
            where: { id },
            include: { _count: { select: { questions: true } } },
        });
        if (!topic)
            throw new common_1.NotFoundException('Topic not found');
        return topic;
    }
    async getQuestions(filter) {
        const { subjectId, topicId, difficulty, year, limit = 20, offset = 0, random } = filter;
        const where = { isActive: true };
        if (subjectId)
            where.subjectId = subjectId;
        if (topicId)
            where.topicId = topicId;
        if (difficulty)
            where.difficulty = difficulty.toUpperCase();
        if (year)
            where.year = year;
        const total = await this.prisma.question.count({ where });
        let questions;
        if (random) {
            const ids = await this.prisma.$queryRaw `
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
        }
        else {
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
    async getQuestion(id) {
        const q = await this.prisma.question.findUnique({
            where: { id },
            include: { subject: true, topic: true },
        });
        if (!q)
            throw new common_1.NotFoundException('Soru bulunamadı.');
        return q;
    }
    async getSolution(id) {
        const q = await this.prisma.question.findUnique({
            where: { id },
            select: { id: true, explanation: true, correctAnswer: true, options: true },
        });
        if (!q)
            throw new common_1.NotFoundException('Soru bulunamadı.');
        return q;
    }
    async recordAnswer(userId, questionId, answer, timeSpentSec, sessionId) {
        const question = await this.prisma.question.findUnique({ where: { id: questionId } });
        if (!question)
            throw new common_1.NotFoundException('Soru bulunamadı.');
        const isCorrect = answer === question.correctAnswer;
        const userAnswer = await this.prisma.userAnswer.create({
            data: { userId, questionId, answer, isCorrect, timeSpentSec, sessionId },
        });
        if (isCorrect) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { xp: { increment: 10 } },
            });
        }
        return { isCorrect, correctAnswer: question.correctAnswer, userAnswer };
    }
    async getUserStats(userId) {
        const answers = await this.prisma.userAnswer.findMany({
            where: { userId },
            include: { question: { select: { subjectId: true, topicId: true } } },
        });
        const total = answers.length;
        const correct = answers.filter((a) => a.isCorrect).length;
        const wrong = total - correct;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        const subjectMap = {};
        for (const a of answers) {
            const sid = a.question.subjectId;
            if (!subjectMap[sid])
                subjectMap[sid] = { correct: 0, total: 0 };
            subjectMap[sid].total++;
            if (a.isCorrect)
                subjectMap[sid].correct++;
        }
        return { total, correct, wrong, accuracy, subjectBreakdown: subjectMap };
    }
    async getWeakTopics(userId) {
        const answers = await this.prisma.userAnswer.findMany({
            where: { userId },
            include: {
                question: { select: { topicId: true, topic: { select: { name: true, subject: { select: { name: true } } } } } },
            },
        });
        const topicMap = {};
        for (const a of answers) {
            const tid = a.question.topicId;
            if (!tid || !a.question.topic)
                continue;
            if (!topicMap[tid]) {
                topicMap[tid] = {
                    correct: 0, total: 0,
                    name: a.question.topic.name,
                    subjectName: a.question.topic.subject.name,
                };
            }
            topicMap[tid].total++;
            if (a.isCorrect)
                topicMap[tid].correct++;
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
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map