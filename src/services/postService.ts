import { supabase } from "../../utils/supabase";
import type { Post } from "../types/IPost";
import type { User } from "@supabase/supabase-js";

// ---------------------- Create Post ----------------------
export async function createPost(data: Partial<Post>, user: User) {
  const authorName = user.user_metadata?.name || "Anonymous";

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      title: data.title,
      content: data.content,
      category: data.category,
      image_url: data.image_url || null,
      user_id: user.id,
      author_name: authorName,
    })
    .select()
    .single();

  if (error) throw error;
  return post;
}

// ---------------------- Get All Posts ----------------------
export async function getAllPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ---------------------- Get Post By ID ----------------------
export async function getPostById(id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// ---------------------- Update Post ----------------------
export async function updatePost(id: string, data: Partial<Post>) {
  const { data: post, error } = await supabase
    .from("posts")
    .update({
      title: data.title,
      content: data.content,
      category: data.category,
      image_url: data.image_url || null,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return post;
}

// ---------------------- Delete Post ----------------------
export async function deletePost(id: string) {
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) throw error;
}
