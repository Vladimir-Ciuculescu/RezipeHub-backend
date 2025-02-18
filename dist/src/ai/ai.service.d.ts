import { ChatCompletionMessageParam } from "openai/resources";
export declare class AiService {
    private readonly openAI;
    constructor();
    generateNotificationContent(messages: ChatCompletionMessageParam[], maxTokens: number): Promise<{
        title: any;
        body: any;
    }>;
}
