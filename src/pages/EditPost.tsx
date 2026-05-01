import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postSchema, type PostFormData } from "../types/IPost";
import { getPostById, updatePost } from "../services/postService";
import { uploadPostImage } from "../services/storageService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function EditPost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    async function fetchPost() {
      try {
        if (!postId) return;
        const post = await getPostById(postId);
        reset({
          title: post.title,
          content: post.content,
          category: post.category,
        });
        if (post.image_url) setExistingImageUrl(post.image_url);
      } catch (error) {
        toast.error("Failed to load post");
      } finally {
        setIsFetching(false);
      }
    }
    fetchPost();
  }, [postId, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
      setExistingImageUrl(null);
    }
  };

  const removeImage = () => {
    setExistingImageUrl(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: PostFormData) => {
    if (!user) {
      toast.error("You must be logged in to edit a post");
      return navigate("/login");
    }

    if (!postId) return;

    setIsLoading(true);
    try {
      let imageUrl: string | undefined = existingImageUrl || undefined;
      
      if (imageFile) {
        imageUrl = await uploadPostImage(imageFile, user.id);
      }

      await updatePost(postId, { ...data, image_url: imageUrl });
      toast.success("Post updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="bg-[#fbf8ff] flex-grow flex items-center justify-center pt-20">
        <div className="text-slate-400 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf8ff] flex-grow flex flex-col pt-20">
      <main className="flex-grow flex flex-col items-center px-6 py-16 max-w-4xl mx-auto w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex justify-between items-end border-b border-black/5 pb-6">
            <div>
              <h1 className="text-3xl font-black italic text-slate-900">Edit Post</h1>
              <p className="text-slate-500 text-sm mt-1">Update your post content and details.</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-[#24389c] to-[#00677f] text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-lg hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <input
              {...register("title")}
              className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#24389c] focus:ring-0 px-0 py-4 text-4xl font-black text-slate-900 placeholder:text-slate-300 transition-colors"
              placeholder="Post Title..."
            />
            {errors.title && <span className="text-red-500 text-xs font-medium">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Category</label>
            <select
              {...register("category")}
              className="rounded-sm border-slate-200 text-sm text-slate-700 bg-white"
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
              <span className="material-symbols-outlined text-sm mr-2">image</span>
              Cover Image
            </label>

            <div className="flex items-center gap-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded transition-colors"
              >
                Choose File
              </button>
              
              <span className="text-sm text-slate-500 flex-grow truncate">
                {imageFile ? imageFile.name : existingImageUrl ? "Existing image attached" : "No file chosen"}
              </span>

              {(imageFile || existingImageUrl) && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 min-h-[400px]">
            <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Content</label>
            <textarea
              {...register("content")}
              className="w-full flex-grow p-6 text-lg border border-black/5 shadow-sm rounded-sm focus:ring-0 placeholder:text-slate-200 leading-relaxed"
              placeholder="Start writing..."
            />
            {errors.content && <span className="text-red-500 text-xs font-medium">{errors.content.message}</span>}
          </div>
        </form>
      </main>
    </div>
  );
}