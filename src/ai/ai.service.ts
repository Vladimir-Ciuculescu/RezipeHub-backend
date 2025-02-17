import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

@Injectable()
export class AiService {
  private readonly openAI = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

  constructor() {}

  async generateNotificationContent(messages: ChatCompletionMessageParam[], maxTokens: number) {
    const completion = await this.openAI.chat.completions.create({
      model: "gpt-4o",
      messages,
      max_tokens: maxTokens,
    });

    let responseText = completion.choices[0].message.content.trim();
    responseText = responseText.replace(/^```json\n/, "").replace(/\n```$/, "");

    const { title, body } = JSON.parse(responseText);

    return { title, body };
  }
}
