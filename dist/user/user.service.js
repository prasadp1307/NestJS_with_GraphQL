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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                age: data.age,
            },
        });
        return user;
    }
    async findOneById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { subscriptions: true },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            include: { subscriptions: true },
        });
    }
    async addSubscription(userId, planName, durationInDays) {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + durationInDays);
        return await this.prisma.subscription.create({
            data: {
                userId,
                planName,
                startDate,
                endDate,
                status: 'active',
            },
        });
    }
    async getUserSubscription(userId) {
        const subscription = await this.prisma.subscription.findFirst({
            where: { userId },
        });
        if (subscription && subscription.endDate < new Date() && subscription.status === 'active') {
            await this.prisma.subscription.update({
                where: { id: subscription.id },
                data: { status: 'expired' },
            });
            subscription.status = 'expired';
        }
        return subscription;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map