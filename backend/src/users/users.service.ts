import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: string, data: {
    fullName?: string;
    phone?: string;
    examCategory?: string;
    targetExamDate?: string;
    notifEnabled?: boolean;
  }) {
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
    const { passwordHash, ...rest } = user as any;
    return rest;
  }

  async getBadges(userId: string) {
    return this.prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });
  }

  async getNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markNotificationRead(notifId: string, userId: string) {
    const notif = await this.prisma.notification.findUnique({ where: { id: notifId } });
    if (!notif || notif.userId !== userId) throw new NotFoundException('Bildirim bulunamadı.');
    return this.prisma.notification.update({ where: { id: notifId }, data: { isRead: true } });
  }

  async markAllNotificationsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { message: 'Tüm bildirimler okundu olarak işaretlendi.' };
  }

  async updateSubscription(userId: string, status: string, endDate?: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: status,
        subscriptionEnd: endDate ? new Date(endDate) : undefined,
      },
    });
  }
}