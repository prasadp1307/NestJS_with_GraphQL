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
exports.PgListenerService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let PgListenerService = class PgListenerService {
    pubSub;
    client;
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    async onModuleInit() {
        this.client = new pg_1.Client({
            connectionString: process.env.DATABASE_URL,
        });
        await this.client.connect();
        await this.client.query('LISTEN subscription_channel');
        this.client.on('notification', async (msg) => {
            const payload = JSON.parse(msg.payload);
            console.log('📢 New direct DB insert:', payload);
            await this.pubSub.publish('userAdded', { userAdded: payload });
        });
        console.log('✅ Listening to subscription_channel...');
    }
    async onModuleDestroy() {
        await this.client.end();
    }
};
exports.PgListenerService = PgListenerService;
exports.PgListenerService = PgListenerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSub])
], PgListenerService);
//# sourceMappingURL=pg-listener.service.js.map