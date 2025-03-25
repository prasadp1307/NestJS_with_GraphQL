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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_2 = require("@nestjs/common");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    pubSub;
    pgClient;
    constructor(pubSub) {
        super();
        this.pubSub = pubSub;
    }
    async onModuleInit() {
        await this.$connect();
        this.pgClient = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
        });
        await this.pgClient.connect();
        await this.pgClient.query('LISTEN subscription_channel');
        this.pgClient.on('notification', async (msg) => {
            console.log('📢 Raw DB Notification Payload:', msg.payload);
            let dbData;
            try {
                dbData = typeof msg.payload === 'string' ? JSON.parse(msg.payload) : msg.payload;
                console.log('✅ Parsed DB Data:', dbData);
            }
            catch (error) {
                console.error('🚨 ERROR: Invalid JSON received from DB:', msg.payload, error);
                return;
            }
            let userData;
            try {
                userData = typeof dbData.data === 'string' ? JSON.parse(dbData.data) : dbData.data;
                console.log('✅ Final User Data:', userData);
            }
            catch (error) {
                console.error('🚨 ERROR: Invalid JSON in dbData.data:', dbData.data, error);
                return;
            }
            await this.pubSub.publish('userAdded', { userAdded: userData });
        });
        this.$use(async (params, next) => {
            if (params.model === 'Subscription' && params.action === 'create') {
                const result = await next(params);
                console.log('🚀 Prisma-created Subscription:', result);
                return result;
            }
            return next(params);
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
        await this.pgClient.end();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map