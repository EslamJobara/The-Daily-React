import { useNavigate } from "react-router-dom";
import type { Post } from "../types/IPost";
import { DEFAULT_AUTHOR_IMAGE } from "../layout/Avatar";
import { useAuth } from "../context/AuthContext";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface PostCardProps {
  post: Post;
  onDelete?: (postId: string) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isOwner = user && user.id === post.user_id;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden group hover:shadow-md transition-shadow">
      {post.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img
            alt={post.title}
            src={post.image_url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[#24389c] font-bold text-[10px] uppercase tracking-widest bg-[#24389c]/10 px-2 py-1 rounded-sm">
            {post.category}
          </span>
          
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/edit-post?id=${post.id}`)}
                className="text-slate-400 hover:text-[#24389c] transition-colors"
                title="Edit"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
              </button>
              <button
                onClick={() => onDelete?.(post.id)}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#24389c] transition-colors">
          {post.title}
        </h2>
        
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {post.content}
        </p>
        
        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
          <img
            src={DEFAULT_AUTHOR_IMAGE}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-50"
            alt={post.author_name || "author"}
          />
          <div>
            <p className="text-sm font-bold text-slate-900">
              {post.author_name || "Anonymous"}
            </p>
            <p className="text-xs text-slate-500">
              {formatDate(post.created_at)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
