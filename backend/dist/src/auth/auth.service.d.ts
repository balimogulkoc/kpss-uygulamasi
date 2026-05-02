import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export interface RegisterDto {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    examCategory?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: any;
    }>;
    getMe(userId: string): Promise<any>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    private signToken;
    private sanitize;
}
