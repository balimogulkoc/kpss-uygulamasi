import {
  Controller, Get, Post, Param, Query, Body, UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExamsService } from './exams.service';

@Controller('exams')
@UseGuards(AuthGuard('jwt'))
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @Get()
  getExams(
    @Query('type') type?: string,
    @Query('isPremium') isPremium?: string,
  ) {
    return this.examsService.getExams({
      type,
      isPremium: isPremium !== undefined ? isPremium === 'true' : undefined,
    });
  }

  @Get('sessions')
  getUserSessions(@Request() req: any) {
    return this.examsService.getUserSessions(req.user.id);
  }

  @Get(':id')
  getExam(@Param('id') id: string, @Request() req: any) {
    return this.examsService.getExam(id, req.user.id);
  }

  @Post(':id/start')
  startSession(@Param('id') id: string, @Request() req: any) {
    return this.examsService.startSession(id, req.user.id);
  }

  @Post('sessions/:sessionId/answer')
  submitAnswer(
    @Param('sessionId') sessionId: string,
    @Request() req: any,
    @Body() body: { questionId: string; answer: string | null; timeSpentSec?: number },
  ) {
    return this.examsService.submitAnswer(
      sessionId,
      body.questionId,
      body.answer,
      body.timeSpentSec || 0,
      req.user.id,
    );
  }

  @Post('sessions/:sessionId/finish')
  finishSession(@Param('sessionId') sessionId: string, @Request() req: any) {
    return this.examsService.finishSession(sessionId, req.user.id);
  }

  @Get('sessions/:sessionId/result')
  getResult(@Param('sessionId') sessionId: string, @Request() req: any) {
    return this.examsService.getSessionResult(sessionId, req.user.id);
  }
}