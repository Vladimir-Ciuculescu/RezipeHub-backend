import Expo from "expo-server-sdk";
import { PrismaService } from "prisma.service";
import { AiService } from "src/ai/ai.service";
export declare class TaskService {
    private readonly prismaService;
    private readonly Expo;
    private readonly aiService;
    constructor(prismaService: PrismaService, Expo: Expo, aiService: AiService);
    private sendExpoNotifications;
    sendTrendingRecipeNotifications(): Promise<void>;
}
