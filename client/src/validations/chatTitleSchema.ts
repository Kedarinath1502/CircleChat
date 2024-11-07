import { z } from "zod";

export const createChatSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: "Chat title must be 4 characters long" }).max(20,{message: "Chat title must be less than 20 characters"}),
    passcode: z
      .string()
      .min(4, { message: "Chat Passcode must be 4 characters long" }).max(20,{message: "Chat passcode must be less than 20 characters"}),
  })
  .required();

export type createChatSchemaType = z.infer<typeof createChatSchema>;