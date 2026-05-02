import { PrismaService } from '../prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboard(userId: string): Promise<{
        totalQuestions: number;
        correctAnswers: number;
        wrongAnswers: number;
        accuracy: number;
        currentStreak: number;
        longestStreak: number;
        totalXP: number;
        level: number;
        studyDays: number;
        totalStudyMinutes: number;
        avgDailyMinutes: number;
        recentSessions: {
            id: string;
            type: string;
            examId: string | null;
            userId: string;
            status: string;
            score: number | null;
            totalQ: number;
            correctQ: number;
            wrongQ: number;
            emptyQ: number;
            timeTakenSec: number;
            startedAt: Date;
            completedAt: Date | null;
        }[];
    }>;
    getSubjectBreakdown(userId: string): Promise<{
        subjectId: number;
        name: string;
        icon: string;
        correct: number;
        total: number;
        accuracy: number;
    }[]>;
    logStudySession(userId: string, durationMin: number, activity: string): Promise<{
        id: string;
        userId: string;
        date: Date;
        durationMin: number;
        activity: string;
    }>;
}
