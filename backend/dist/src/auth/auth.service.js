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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Bu e-posta adresi zaten kayıtlı.');
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                fullName: dto.fullName,
                phone: dto.phone,
                examCategory: dto.examCategory,
            },
        });
        const token = this.signToken(user.id, user.email, user.role);
        return { token, user: this.sanitize(user) };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('E-posta veya şifre hatalı.');
        const valid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('E-posta veya şifre hatalı.');
        const token = this.signToken(user.id, user.email, user.role);
        return { token, user: this.sanitize(user) };
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException();
        return this.sanitize(user);
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException();
        const valid = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Mevcut şifre hatalı.');
        const passwordHash = await bcrypt.hash(newPassword, 12);
        await this.prisma.user.update({ where: { id: userId }, data: { passwordHash } });
        return { message: 'Şifre başarıyla güncellendi.' };
    }
    signToken(userId, email, role) {
        return this.jwt.sign({ sub: userId, email, role });
    }
    sanitize(user) {
        const { passwordHash, ...rest } = user;
        return rest;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map