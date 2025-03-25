import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private pubSub;
    private pgClient;
    constructor(pubSub: PubSub);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
