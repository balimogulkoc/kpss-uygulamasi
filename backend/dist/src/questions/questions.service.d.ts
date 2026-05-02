import { PrismaService } from '../prisma.service';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSubjects(): Promise<({
        _count: {
            questions: number;
        };
    } & {
        id: number;
        code: string;
        name: string;
        description: string | null;
        icon: string | null;
        orderIndex: number;
        isActive: boolean;
    })[]>;
    getTopics(subjectId?: number): Promise<({
        _count: {
            questions: number;
        };
    } & {
        id: number;
        name: string;
        description: string | null;
        orderIndex: number;
        isActive: boolean;
        subjectId: number;
    })[]>;
    getTopic(id: number): Promise<{
        _count: {
            questions: number;
        };
    } & {
        id: number;
        name: string;
        description: string | null;
        orderIndex: number;
        isActive: boolean;
        subjectId: number;
    }>;
    getQuestions(filter: {
        subjectId?: number;
        topicId?: number;
        difficulty?: string;
        year?: number;
        limit?: number;
        offset?: number;
        random?: boolean;
    }): Promise<{
        data: any;
        total: number;
        limit: number;
        offset: number;
    }>;
    getQuestion(id: string): Promise<{
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
        topicId: number | null;
    }>;
    getSolution(id: string): Promise<{
        id: string;
        options: string;
        correctAnswer: string;
        explanation: string;
    }>;
    recordAnswer(userId: string, questionId: string, answer: string, timeSpentSec: number, sessionId?: string): Promise<{
        isCorrect: boolean;
        correctAnswer: string;
        userAnswer: {
            id: string;
            answer: string;
            isCorrect: boolean;
            timeSpentSec: number;
            answeredAt: Date;
            userId: string;
            questionId: string;
            sessionId: string | null;
        };
    }>;
    getUserStats(userId: string): Promise<{
        total: number;
        correct: number;
        wrong: number;
        accuracy: number;
        subjectBreakdown: Record<number, {
            correct: number;
            total: number;
        }>;
    }>;
    getWeakTopics(userId: string): Promise<{
        topicId: number;
        topicName: string;
        subjectName: string;
        accuracy: number;
        total: number;
    }[]>;
}
