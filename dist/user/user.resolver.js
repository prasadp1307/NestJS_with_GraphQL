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
exports.UserResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    userService;
    pubSub;
    constructor(userService, pubSub) {
        this.userService = userService;
        this.pubSub = pubSub;
    }
    getAllUsers() {
        return this.userService.findAll();
    }
    async getUser(id) {
        return this.userService.findOneById(id);
    }
    async createUser(id, email, password, age) {
        const newUser = this.userService.create({
            email,
            password,
            age,
        });
        await this.pubSub.publish('userAdded', { userAdded: newUser });
        return newUser;
    }
    userAdded() {
        return this.pubSub.asyncIterableIterator('userAdded');
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Query)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, graphql_1.Query)('user'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Mutation)('createUser'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('email')),
    __param(2, (0, graphql_1.Args)('password')),
    __param(3, (0, graphql_1.Args)('age')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Subscription)('userAdded', {
        resolve: (payload) => payload.userAdded,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "userAdded", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)('User'),
    __param(1, (0, common_1.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        graphql_subscriptions_1.PubSub])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map