import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(AuthGuard('jwt'))
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getDashboard(@Request() req: any) {
    return this.analyticsService.getDashboard(req.user.id);
  }

  @Get('subjects')
  getSubjectBreakdown(@Request() req: any) {
    return this.analyticsService.getSubjectBreakdown(req.user.id);
  }

  @Post('study-log')
  logStudy(
    @Request() req: any,
    @Body() body: { durationMin: number; activity: string },
  ) {
    return this.analyticsService.logStudySession(req.user.id, body.durationMin, body.activity);
  }
}