import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: string, data: {
        fullName?: string;
        phone?: string;
        examCategory?: string;
        targetExamDate?: string;
        notifEnabled?: boolean;
    }): Promise<any>;
    getBadges(userId: string): Promise<({
        badge: {
            id: string;
            name: string;
            description: string;
            icon: string;
            condition: string;
        };
    } & {
        userId: string;
        badgeId: string;
        earnedAt: Date;
    })[]>;
    getNotifications(userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: string;
        userId: string;
        body: string;
        isRead: boolean;
    }[]>;
    markNotificationRead(notifId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: string;
        userId: string;
        body: string;
        isRead: boolean;
    }>;
    markAllNotificationsRead(userId: string): Promise<{
        message: string;
    }>;
    updateSubscription(userId: string, status: string, endDate?: string): Promise<{
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
