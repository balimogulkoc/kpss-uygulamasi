import { Controller, Get, Patch, Post, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('profile')
  updateProfile(@Request() req: any, @Body() body: any) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Get('badges')
  getBadges(@Request() req: any) {
    return this.usersService.getBadges(req.user.id);
  }

  @Get('notifications')
  getNotifications(@Request() req: any) {
    return this.usersService.getNotifications(req.user.id);
  }

  @Patch('notifications/:id/read')
  markRead(@Param('id') id: string, @Request() req: any) {
    return this.usersService.markNotificationRead(id, req.user.id);
  }

  @Post('notifications/read-all')
  markAllRead(@Request() req: any) {
    return this.usersService.markAllNotificationsRead(req.user.id);
  }
}