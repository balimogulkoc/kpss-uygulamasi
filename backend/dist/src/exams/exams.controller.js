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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const exams_service_1 = require("./exams.service");
let ExamsController = class ExamsController {
    constructor(examsService) {
        this.examsService = examsService;
    }
    getExams(type, isPremium) {
        return this.examsService.getExams({
            type,
            isPremium: isPremium !== undefined ? isPremium === 'true' : undefined,
        });
    }
    getUserSessions(req) {
        return this.examsService.getUserSessions(req.user.id);
    }
    getExam(id, req) {
        return this.examsService.getExam(id, req.user.id);
    }
    startSession(id, req) {
        return this.examsService.startSession(id, req.user.id);
    }
    submitAnswer(sessionId, req, body) {
        return this.examsService.submitAnswer(sessionId, body.questionId, body.answer, body.timeSpentSec || 0, req.user.id);
    }
    finishSession(sessionId, req) {
        return this.examsService.finishSession(sessionId, req.user.id);
    }
    getResult(sessionId, req) {
        return this.examsService.getSessionResult(sessionId, req.user.id);
    }
};
exports.ExamsController = ExamsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('isPremium')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getExams", null);
__decorate([
    (0, common_1.Get)('sessions'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getUserSessions", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getExam", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "startSession", null);
__decorate([
    (0, common_1.Post)('sessions/:sessionId/answer'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "submitAnswer", null);
__decorate([
    (0, common_1.Post)('sessions/:sessionId/finish'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "finishSession", null);
__decorate([
    (0, common_1.Get)('sessions/:sessionId/result'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getResult", null);
exports.ExamsController = ExamsController = __decorate([
    (0, common_1.Controller)('exams'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
//# sourceMappingURL=exams.controller.js.map