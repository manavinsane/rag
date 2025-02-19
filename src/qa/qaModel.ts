import { MessageContent } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as dotenv from "dotenv";
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-exp",
  temperature: 0.5,
});

export async function generateAnswer(
  query: string,
  context: string
): Promise<MessageContent> {
  // Construct the prompt with context
  const prompt = `Answer the question based on the following context:\n\n${context}\n\nQuestion: ${query}\nAnswer:`;

  const response = await model.invoke(prompt);

  return response.content;
}
