import { z } from "zod";

const envSchema = z.object({
  MORALIS_API_KEY: z.string().min(1, "MORALIS_API_KEY is required"),
  BACKEND_URL: z.string().min(1, "BACKEND_URL is required"),
  BACKEND_API_KEY: z.string().min(1, "BACKEND_API_KEY is required"),
});


// This will throw an error if the environment variables are not set correctly
export const env = envSchema.parse({
  MORALIS_API_KEY: process.env.MORALIS_API_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
  BACKEND_API_KEY: process.env.BACKEND_API_KEY,
});
