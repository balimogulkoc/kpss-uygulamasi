import { ExamsService } from './exams.service';
export declare class ExamsController {
    private examsService;
    constructor(examsService: ExamsService);
    getExams(type?: string, isPremium?: string): Promise<{
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
    getUserSessions(req: any): Promise<({
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
    getExam(id: string, req: any): Promise<{
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
    startSession(id: string, req: any): Promise<{
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
    submitAnswer(sessionId: string, req: any, body: {
        questionId: string;
        answer: string | null;
        timeSpentSec?: number;
    }): Promise<{
        skipped: boolean;
        isCorrect?: undefined;
        correctAnswer?: undefined;
    } | {
        isCorrect: boolean;
        correctAnswer: string;
        skipped?: undefined;
    }>;
    finishSession(sessionId: string, req: any): Promise<{
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
    getResult(sessionId: string, req: any): Promise<{
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
}
