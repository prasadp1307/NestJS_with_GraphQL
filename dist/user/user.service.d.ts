import { Prisma, User, Subscription } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    findOneById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    addSubscription(userId: number, planName: string, durationInDays: number): Promise<Subscription>;
    getUserSubscription(userId: number): Promise<Subscription | null>;
}
