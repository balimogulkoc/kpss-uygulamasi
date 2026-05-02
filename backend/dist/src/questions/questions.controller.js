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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const questions_service_1 = require("./questions.service");
let QuestionsController = class QuestionsController {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    getSubjects() {
        return this.questionsService.getSubjects();
    }
    getTopics(subjectId) {
        return this.questionsService.getTopics(subjectId ? Number(subjectId) : undefined);
    }
    getTopic(id) {
        return this.questionsService.getTopic(Number(id));
    }
    getQuestions(subjectId, topicId, difficulty, year, limit, offset, random) {
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
    getQuestion(id) {
        return this.questionsService.getQuestion(id);
    }
    getSolution(id) {
        return this.questionsService.getSolution(id);
    }
    recordAnswer(id, req, body) {
        return this.questionsService.recordAnswer(req.user.id, id, body.answer, body.timeSpentSec || 0, body.sessionId);
    }
    getMyStats(req) {
        return this.questionsService.getUserStats(req.user.id);
    }
    getWeakTopics(req) {
        return this.questionsService.getWeakTopics(req.user.id);
    }
};
exports.QuestionsController = QuestionsController;
__decorate([
    (0, common_1.Get)('subjects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getSubjects", null);
__decorate([
    (0, common_1.Get)('topics'),
    __param(0, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getTopics", null);
__decorate([
    (0, common_1.Get)('topics/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getTopic", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Query)('subjectId')),
    __param(1, (0, common_1.Query)('topicId')),
    __param(2, (0, common_1.Query)('difficulty')),
    __param(3, (0, common_1.Query)('year')),
    __param(4, (0, common_1.Query)('limit')),
    __param(5, (0, common_1.Query)('offset')),
    __param(6, (0, common_1.Query)('random')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getQuestion", null);
__decorate([
    (0, common_1.Get)(':id/solution'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getSolution", null);
__decorate([
    (0, common_1.Post)(':id/answer'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "recordAnswer", null);
__decorate([
    (0, common_1.Get)('stats/me'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getMyStats", null);
__decorate([
    (0, common_1.Get)('stats/weak-topics'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestionsController.prototype, "getWeakTopics", null);
exports.QuestionsController = QuestionsController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsController);
//# sourceMappingURL=questions.controller.js.map