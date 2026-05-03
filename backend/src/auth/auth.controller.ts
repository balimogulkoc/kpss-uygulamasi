import {
  Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() body: {
      email: string;
      password: string;
      fullName: string;
      phone?: string;
      examCategory?: string;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@Request() req: any) {
    return this.authService.getMe(req.user.id);
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  changePassword(
    @Request() req: any,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(req.user.id, body.oldPassword, body.newPassword);
  }
}