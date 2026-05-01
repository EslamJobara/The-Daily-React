import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(10, "Title should be at least 10 characters"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["LATEST", "TUTORIAL", "ARCHITECTURE", "COMMUNITY", "PERFORMANCE"]),
  image_url: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;

export interface Post {
  id: string;
  created_at: string;
  title: string;
  content: string;
  category: "LATEST" | "TUTORIAL" | "ARCHITECTURE" | "COMMUNITY" | "PERFORMANCE";
  image_url?: string;
  user_id: string;
  author_name?: string;
  author_email?: string;
}