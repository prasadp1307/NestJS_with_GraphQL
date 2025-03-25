import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
export declare class PgListenerService implements OnModuleInit, OnModuleDestroy {
    private pubSub;
    private client;
    constructor(pubSub: PubSub);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
