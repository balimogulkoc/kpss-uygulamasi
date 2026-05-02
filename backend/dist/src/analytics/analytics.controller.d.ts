import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getDashboard(req: any): Promise<{
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
    getSubjectBreakdown(req: any): Promise<{
        subjectId: number;
        name: string;
        icon: string;
        correct: number;
        total: number;
        accuracy: number;
    }[]>;
    logStudy(req: any, body: {
        durationMin: number;
        activity: string;
    }): Promise<{
        id: string;
        userId: string;
        date: Date;
        durationMin: number;
        activity: string;
    }>;
}
