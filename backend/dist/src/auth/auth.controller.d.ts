import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
        fullName: string;
        phone?: string;
        examCategory?: string;
    }): Promise<{
        token: string;
        user: any;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        user: any;
    }>;
    getMe(req: any): Promise<any>;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
