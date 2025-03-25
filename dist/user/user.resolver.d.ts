import { PubSub } from 'graphql-subscriptions';
import { UserService } from 'src/user/user.service';
export declare class UserResolver {
    private userService;
    private pubSub;
    constructor(userService: UserService, pubSub: PubSub);
    getAllUsers(): Promise<{
        id: number;
        email: string;
        password: string;
        age: number;
    }[]>;
    getUser(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        age: number;
    } | null>;
    createUser(id: number, email: string, password: string, age: number): Promise<{
        id: number;
        email: string;
        password: string;
        age: number;
    }>;
    userAdded(): import("graphql-subscriptions/dist/pubsub-async-iterable-iterator").PubSubAsyncIterableIterator<unknown>;
}
