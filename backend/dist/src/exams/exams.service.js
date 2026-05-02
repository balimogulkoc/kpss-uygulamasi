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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ExamsService = class ExamsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getExams(filter = {}) {
        const where = { isActive: true };
        if (filter.type)
            where.type = filter.type;
        if (filter.isPremium !== undefined)
            where.isPremium = filter.isPremium;
        const exams = await this.prisma.exam.findMany({
            where,
            include: { _count: { select: { items: true, sessions: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return { data: exams, total: exams.length };
    }
    async getExam(examId, userId) {
        const exam = await this.prisma.exam.findUnique({
            where: { id: examId },
            include: {
                items: {
                    orderBy: { orderIndex: 'asc' },
                    include: { question: { include: { subject: true, topic: true } } },
                },
            },
        });
        if (!exam)
            throw new common_1.NotFoundException('Sınav bulunamadı.');
        if (exam.isPremium) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user?.subscriptionStatus !== 'active') {
                throw new common_1.ForbiddenException('Bu sınava erişmek için Premium üyelik gereklidir.');
            }
        }
        return exam;
    }
    async startSession(examId, userId) {
        const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
        if (!exam)
            throw new common_1.NotFoundException('Sınav bulunamadı.');
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
    async submitAnswer(sessionId, questionId, answer, timeSpentSec, userId) {
        const session = await this.prisma.examSession.findUnique({ where: { id: sessionId } });
        if (!session || session.userId !== userId)
            throw new common_1.NotFoundException('Oturum bulunamadı.');
        if (session.status !== 'in_progress')
            throw new common_1.ForbiddenException('Oturum tamamlanmış.');
        if (!answer)
            return { skipped: true };
        const question = await this.prisma.question.findUnique({ where: { id: questionId } });
        if (!question)
            throw new common_1.NotFoundException('Soru bulunamadı.');
        const isCorrect = answer === question.correctAnswer;
        await this.prisma.userAnswer.create({
            data: { userId, questionId, answer, isCorrect, timeSpentSec, sessionId },
        });
        return { isCorrect, correctAnswer: question.correctAnswer };
    }
    async finishSession(sessionId, userId) {
        const session = await this.prisma.examSession.findUnique({
            where: { id: sessionId },
            include: { answers: true },
        });
        if (!session || session.userId !== userId)
            throw new common_1.NotFoundException('Oturum bulunamadı.');
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
        await this.prisma.user.update({
            where: { id: userId },
            data: { xp: { increment: Math.round(score) } },
        });
        return updated;
    }
    async getSessionResult(sessionId, userId) {
        const session = await this.prisma.examSession.findUnique({
            where: { id: sessionId },
            include: {
                answers: {
                    include: { question: { include: { subject: true, topic: true } } },
                },
                exam: true,
            },
        });
        if (!session || session.userId !== userId)
            throw new common_1.NotFoundException('Oturum bulunamadı.');
        return session;
    }
    async getUserSessions(userId) {
        return this.prisma.examSession.findMany({
            where: { userId },
            include: { exam: { select: { title: true, type: true } } },
            orderBy: { startedAt: 'desc' },
            take: 20,
        });
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map