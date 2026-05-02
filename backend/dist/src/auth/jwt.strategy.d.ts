import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        fullName: string;
        phone: string | null;
        avatarUrl: string | null;
        role: string;
        level: number;
        xp: number;
        currentStreak: number;
        longestStreak: number;
        lastStudyDate: Date | null;
        targetExamDate: Date | null;
        examCategory: string | null;
        subscriptionStatus: string;
        subscriptionEnd: Date | null;
        notifEnabled: boolean;
    }>;
}
export {};
