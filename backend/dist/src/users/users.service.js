"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateProfile(userId, data) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.fullName && { fullName: data.fullName }),
                ...(data.phone !== undefined && { phone: data.phone }),
                ...(data.examCategory && { examCategory: data.examCategory }),
                ...(data.targetExamDate && { targetExamDate: new Date(data.targetExamDate) }),
                ...(data.notifEnabled !== undefined && { notifEnabled: data.notifEnabled }),
            },
        });
        const { passwordHash, ...rest } = user;
        return rest;
    }
    async getBadges(userId) {
        return this.prisma.userBadge.findMany({
            where: { userId },
            include: { badge: true },
            orderBy: { earnedAt: 'desc' },
        });
    }
    async getNotifications(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async markNotificationRead(notifId, userId) {
        const notif = await this.prisma.notification.findUnique({ where: { id: notifId } });
        if (!notif || notif.userId !== userId)
            throw new common_1.NotFoundException('Bildirim bulunamadı.');
        return this.prisma.notification.update({ where: { id: notifId }, data: { isRead: true } });
    }
    async markAllNotificationsRead(userId) {
        await this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
        return { message: 'Tüm bildirimler okundu olarak işaretlendi.' };
    }
    async updateSubscription(userId, status, endDate) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                subscriptionStatus: status,
                subscriptionEnd: endDate ? new Date(endDate) : undefined,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map