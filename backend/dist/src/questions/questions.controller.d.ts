import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private questionsService;
    constructor(questionsService: QuestionsService);
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
    getTopics(subjectId?: string): Promise<({
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
    getTopic(id: string): Promise<{
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
    getQuestions(subjectId?: string, topicId?: string, difficulty?: string, year?: string, limit?: string, offset?: string, random?: string): Promise<{
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
    recordAnswer(id: string, req: any, body: {
        answer: string;
        timeSpentSec?: number;
        sessionId?: string;
    }): Promise<{
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
    getMyStats(req: any): Promise<{
        total: number;
        correct: number;
        wrong: number;
        accuracy: number;
        subjectBreakdown: Record<number, {
            correct: number;
            total: number;
        }>;
    }>;
    getWeakTopics(req: any): Promise<{
        topicId: number;
        topicName: string;
        subjectName: string;
        accuracy: number;
        total: number;
    }[]>;
}
