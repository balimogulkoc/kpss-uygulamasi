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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboard(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        const answers = await this.prisma.userAnswer.findMany({ where: { userId } });
        const total = answers.length;
        const correct = answers.filter((a) => a.isCorrect).length;
        const wrong = total - correct;
        const accuracy = total > 0 ? (correct / total) * 100 : 0;
        const sessions = await this.prisma.examSession.findMany({
            where: { userId, status: 'completed' },
            orderBy: { completedAt: 'desc' },
            take: 5,
        });
        const studyLogs = await this.prisma.studyLog.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 30,
        });
        const totalStudyMinutes = studyLogs.reduce((s, l) => s + l.durationMin, 0);
        const avgDailyMinutes = studyLogs.length > 0 ? Math.round(totalStudyMinutes / studyLogs.length) : 0;
        return {
            totalQuestions: total,
            correctAnswers: correct,
            wrongAnswers: wrong,
            accuracy,
            currentStreak: user?.currentStreak || 0,
            longestStreak: user?.longestStreak || 0,
            totalXP: user?.xp || 0,
            level: user?.level || 1,
            studyDays: studyLogs.length,
            totalStudyMinutes,
            avgDailyMinutes,
            recentSessions: sessions,
        };
    }
    async getSubjectBreakdown(userId) {
        const answers = await this.prisma.userAnswer.findMany({
            where: { userId },
            include: { question: { select: { subjectId: true, subject: { select: { name: true, icon: true } } } } },
        });
        const map = {};
        for (const a of answers) {
            const sid = a.question.subjectId;
            if (!map[sid]) {
                map[sid] = { name: a.question.subject.name, icon: a.question.subject.icon, correct: 0, total: 0 };
            }
            map[sid].total++;
            if (a.isCorrect)
                map[sid].correct++;
        }
        return Object.entries(map).map(([id, v]) => ({
            subjectId: Number(id),
            name: v.name,
            icon: v.icon,
            correct: v.correct,
            total: v.total,
            accuracy: v.total > 0 ? (v.correct / v.total) * 100 : 0,
        }));
    }
    async logStudySession(userId, durationMin, activity) {
        const log = await this.prisma.studyLog.create({
            data: { userId, durationMin, activity },
        });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const lastStudy = user.lastStudyDate ? new Date(user.lastStudyDate) : null;
            if (lastStudy)
                lastStudy.setHours(0, 0, 0, 0);
            const isToday = lastStudy?.getTime() === today.getTime();
            const isYesterday = lastStudy?.getTime() === today.getTime() - 86400000;
            let newStreak = user.currentStreak;
            if (!isToday) {
                newStreak = isYesterday ? user.currentStreak + 1 : 1;
            }
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    lastStudyDate: new Date(),
                    currentStreak: newStreak,
                    longestStreak: Math.max(user.longestStreak, newStreak),
                },
            });
        }
        return log;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map