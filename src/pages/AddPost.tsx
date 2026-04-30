import React from "react";
import { useForm } from "react-hook-form";
import type { Post } from "../types/IPost";

const AddPost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Post>({
    defaultValues: {
      category: "LATEST",
      readTime: "5 min read",
    },
  });

  const onSubmit = (data: Post) => {
    console.log("Submitting Post Data:", data);
    // هنا بتبعت الداتا للـ API
    // reset(); // عشان تفضي الفورم بعد الإرسال
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen flex flex-col pt-20">
      <main className="flex-grow flex flex-col items-center px-6 py-16 max-w-4xl mx-auto w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-8"
        >
          {/* Header & Actions */}
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
                type="button"
                onClick={() => reset()}
                className="px-6 py-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#24389c] to-[#00677f] text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-lg hover:opacity-90 transition-all active:scale-95"
              >
                Publish Post
              </button>
            </div>
          </div>

          {/* Title Section */}
          <div className="flex flex-col gap-2">
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 10,
                  message: "Title should be at least 10 characters",
                },
              })}
              className="w-full bg-transparent border-0 border-b-2 border-slate-200 focus:border-[#24389c] focus:ring-0 px-0 py-4 text-4xl font-black text-slate-900 placeholder:text-slate-300 transition-colors"
              placeholder="Post Title..."
            />
            {errors.title && (
              <span className="text-red-500 text-xs font-medium">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Meta Data Grid (Category & Read Time) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="input-filled rounded-sm border-slate-200 text-sm text-slate-700"
              >
                <option value="LATEST">Latest</option>
                <option value="TUTORIAL">Tutorial</option>
                <option value="ARCHITECTURE">Architecture</option>
                <option value="COMMUNITY">Community</option>
                <option value="PERFORMANCE">Performance</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                Read Time (e.g. 5 min read)
              </label>
              <input
                {...register("readTime", { required: "Read time is required" })}
                className="input-filled rounded-sm border-slate-200 text-sm"
                placeholder="5 min read"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div className="flex flex-col gap-2 bg-white p-4 rounded-sm border border-black/5 shadow-sm">
            <label className="flex items-center font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm mr-2">
                image
              </span>
              Cover Image URL
            </label>
            <input
              {...register("imageUrl")}
              className="w-full bg-transparent border-0 border-b border-slate-100 focus:border-[#24389c] focus:ring-0 py-2 text-sm text-slate-600 placeholder:text-slate-300"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Excerpt (Short Summary) */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Excerpt (Brief Summary)
            </label>
            <textarea
              {...register("excerpt", {
                required: "Excerpt is required",
                maxLength: {
                  value: 160,
                  message: "Excerpt should be under 160 characters",
                },
              })}
              rows={2}
              className="input-filled rounded-sm border-slate-200 text-sm resize-none"
              placeholder="Write a short summary for the post card..."
            />
            {errors.excerpt && (
              <span className="text-red-500 text-xs font-medium">
                {errors.excerpt.message}
              </span>
            )}
          </div>

          {/* Content (Main Body) */}
          <div className="flex flex-col gap-2 min-h-[400px]">
            <label className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
              Main Content
            </label>
            <div className="flex-grow bg-white border border-black/5 shadow-sm rounded-sm flex flex-col">
              <div className="p-3 border-b border-slate-50 bg-slate-50/50 flex gap-2">
                <span className="material-symbols-outlined text-slate-400 text-md">
                  format_bold
                </span>
                <span className="material-symbols-outlined text-slate-400 text-md">
                  format_italic
                </span>
                <span className="material-symbols-outlined text-slate-400 text-md">
                  code
                </span>
              </div>
              <textarea
                {...register("content" as any, {
                  required: "Content is required",
                })}
                className="w-full flex-grow p-6 text-lg border-0 focus:ring-0 placeholder:text-slate-200 leading-relaxed"
                placeholder="Start writing your architectural masterpiece..."
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddPost;
