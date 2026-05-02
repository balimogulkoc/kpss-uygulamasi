import { PrismaService } from '../prisma.service';
export declare class ExamsService {
    private prisma;
    constructor(prisma: PrismaService);
    getExams(filter?: {
        type?: string;
        isPremium?: boolean;
    }): Promise<{
        data: ({
            _count: {
                items: number;
                sessions: number;
            };
        } & {
            id: string;
            description: string | null;
            isActive: boolean;
            difficulty: string;
            createdAt: Date;
            title: string;
            type: string;
            durationMinutes: number;
            isPremium: boolean;
        })[];
        total: number;
    }>;
    getExam(examId: string, userId: string): Promise<{
        items: ({
            question: {
                subject: {
                    id: number;
                    code: string;
                    name: string;
                    description: string | null;
                    icon: string | null;
                    orderIndex: number;
                    isActive: boolean;
                };
                topic: {
                    id: number;
                    name: string;
                    description: string | null;
                    orderIndex: number;
                    isActive: boolean;
                    subjectId: number;
                };
            } & {
                id: string;
                isActive: boolean;
                subjectId: number;
                topicId: number | null;
                text: string;
                imageUrl: string | null;
                options: string;
                correctAnswer: string;
                difficulty: string;
                year: number | null;
                source: string | null;
                explanation: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            orderIndex: number;
            examId: string;
            questionId: string;
        })[];
    } & {
        id: string;
        description: string | null;
        isActive: boolean;
        difficulty: string;
        createdAt: Date;
        title: string;
        type: string;
        durationMinutes: number;
        isPremium: boolean;
    }>;
    startSession(examId: string, userId: string): Promise<{
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
    }>;
    submitAnswer(sessionId: string, questionId: string, answer: string | null, timeSpentSec: number, userId: string): Promise<{
        skipped: boolean;
        isCorrect?: undefined;
        correctAnswer?: undefined;
    } | {
        isCorrect: boolean;
        correctAnswer: string;
        skipped?: undefined;
    }>;
    finishSession(sessionId: string, userId: string): Promise<{
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
    }>;
    getSessionResult(sessionId: string, userId: string): Promise<{
        exam: {
            id: string;
            description: string | null;
            isActive: boolean;
            difficulty: string;
            createdAt: Date;
            title: string;
            type: string;
            durationMinutes: number;
            isPremium: boolean;
        };
        answers: ({
            question: {
                subject: {
                    id: number;
                    code: string;
                    name: string;
                    description: string | null;
                    icon: string | null;
                    orderIndex: number;
                    isActive: boolean;
                };
                topic: {
                    id: number;
                    name: string;
                    description: string | null;
                    orderIndex: number;
                    isActive: boolean;
                    subjectId: number;
                };
            } & {
                id: string;
                isActive: boolean;
                subjectId: number;
                topicId: number | null;
                text: string;
                imageUrl: string | null;
                options: string;
                correctAnswer: string;
                difficulty: string;
                year: number | null;
                source: string | null;
                explanation: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            questionId: string;
            userId: string;
            answer: string;
            isCorrect: boolean;
            timeSpentSec: number;
            answeredAt: Date;
            sessionId: string | null;
        })[];
    } & {
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
    }>;
    getUserSessions(userId: string): Promise<({
        exam: {
            title: string;
            type: string;
        };
    } & {
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
    })[]>;
}
