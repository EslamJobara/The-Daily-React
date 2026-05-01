import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { postSchema, type PostFormData } from "../types/IPost";
import { createPost } from "../services/postService";
import { uploadPostImage } from "../services/storageService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function AddPost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      category: "LATEST",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      toast.error("You must be logged in to create a post");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    let imageUrl: string | undefined;
    if (imageFile) {
      imageUrl = await uploadPostImage(imageFile, user.id);
    }

    await createPost({ ...data, image_url: imageUrl }, user);
    toast.success("Post published successfully!");
    reset();
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="bg-[#fbf8ff] flex-grow flex flex-col pt-20">
      <main className="flex-grow flex flex-col items-center px-6 py-16 max-w-4xl mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex justify-between items-end border-b border-black/5 pb-6">
            <div>
              <h1 className="text-3xl font-black italic text-slate-900">
                Create New Post
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Share your latest React insights with the community.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-[#24389c] to-[#00677f] text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-lg hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input
              {...register("title")}
              className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#24389c] focus:ring-0 px-0 py-4 text-4xl font-black text-slate-900 placeholder:text-slate-300 transition-colors"
              placeholder="Post Title..."
            />
            {errors.title && (
              <span className="text-red-500 text-xs font-medium">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Category
            </label>
            <select
              {...register("category")}
              className="input-filled rounded-sm border-slate-200 text-sm text-slate-700"
            >
              <option value="LATEST">Latest</option>
              <option value="TUTORIAL">Tutorial</option>
              <option value="ARCHITECTURE">Architecture</option>
              <option value="COMMUNITY">Community</option>
              <option value="PERFORMANCE">Performance</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 bg-white p-4 rounded-sm border border-black/5 shadow-sm">
            <label className="flex items-center font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm mr-2">
                image
              </span>
              Cover Image
            </label>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded transition-colors"
              >
                Choose File
              </button>
              
              <span className="text-sm text-slate-500 flex-grow truncate">
                {imageFile ? imageFile.name : "No file chosen"}
              </span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-2 min-h-[400px]">
            <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Content
            </label>
            <textarea
              {...register("content")}
              className="w-full flex-grow p-6 text-lg border border-black/5 shadow-sm rounded-sm focus:ring-0 placeholder:text-slate-200 leading-relaxed"
              placeholder="Start writing your post content..."
            />
            {errors.content && (
              <span className="text-red-500 text-xs font-medium">
                {errors.content.message}
              </span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
