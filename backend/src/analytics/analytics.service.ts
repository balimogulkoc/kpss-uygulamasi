import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(userId: string) {
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

  async getSubjectBreakdown(userId: string) {
    const answers = await this.prisma.userAnswer.findMany({
      where: { userId },
      include: { question: { select: { subjectId: true, subject: { select: { name: true, icon: true } } } } },
    });

    const map: Record<number, { name: string; icon: string | null; correct: number; total: number }> = {};
    for (const a of answers) {
      const sid = a.question.subjectId;
      if (!map[sid]) {
        map[sid] = { name: a.question.subject.name, icon: a.question.subject.icon, correct: 0, total: 0 };
      }
      map[sid].total++;
      if (a.isCorrect) map[sid].correct++;
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

  async logStudySession(userId: string, durationMin: number, activity: string) {
    const log = await this.prisma.studyLog.create({
      data: { userId, durationMin, activity },
    });

    // Update streak
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastStudy = user.lastStudyDate ? new Date(user.lastStudyDate) : null;
      if (lastStudy) lastStudy.setHours(0, 0, 0, 0);

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
}