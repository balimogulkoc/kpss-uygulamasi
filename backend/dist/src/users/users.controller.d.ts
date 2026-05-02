import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    updateProfile(req: any, body: any): Promise<any>;
    getBadges(req: any): Promise<({
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
    getNotifications(req: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: string;
        userId: string;
        body: string;
        isRead: boolean;
    }[]>;
    markRead(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        type: string;
        userId: string;
        body: string;
        isRead: boolean;
    }>;
    markAllRead(req: any): Promise<{
        message: string;
    }>;
}
