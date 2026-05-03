import {
  Controller, Get, Post, Param, Query, Body, UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get('subjects')
  getSubjects() {
    return this.questionsService.getSubjects();
  }

  @Get('topics')
  getTopics(@Query('subjectId') subjectId?: string) {
    return this.questionsService.getTopics(subjectId ? Number(subjectId) : undefined);
  }

  @Get('topics/:id')
  getTopic(@Param('id') id: string) {
    return this.questionsService.getTopic(Number(id));
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getQuestions(
    @Query('subjectId') subjectId?: string,
    @Query('topicId') topicId?: string,
    @Query('difficulty') difficulty?: string,
    @Query('year') year?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('random') random?: string,
  ) {
    return this.questionsService.getQuestions({
      subjectId: subjectId ? Number(subjectId) : undefined,
      topicId: topicId ? Number(topicId) : undefined,
      difficulty,
      year: year ? Number(year) : undefined,
      limit: limit ? Number(limit) : 20,
      offset: offset ? Number(offset) : 0,
      random: random === 'true',
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getQuestion(@Param('id') id: string) {
    return this.questionsService.getQuestion(id);
  }

  @Get(':id/solution')
  @UseGuards(AuthGuard('jwt'))
  getSolution(@Param('id') id: string) {
    return this.questionsService.getSolution(id);
  }

  @Post(':id/answer')
  @UseGuards(AuthGuard('jwt'))
  recordAnswer(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { answer: string; timeSpentSec?: number; sessionId?: string },
  ) {
    return this.questionsService.recordAnswer(
      req.user.id,
      id,
      body.answer,
      body.timeSpentSec || 0,
      body.sessionId,
    );
  }

  @Get('stats/me')
  @UseGuards(AuthGuard('jwt'))
  getMyStats(@Request() req: any) {
    return this.questionsService.getUserStats(req.user.id);
  }

  @Get('stats/weak-topics')
  @UseGuards(AuthGuard('jwt'))
  getWeakTopics(@Request() req: any) {
    return this.questionsService.getWeakTopics(req.user.id);
  }
}