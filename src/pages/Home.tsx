import { useEffect, useState } from "react";
import type { Post } from "../types/IPost";
import { getAllPosts, deletePost } from "../services/postService";
import PostCard from "../components/PostCard";
import toast from "react-hot-toast";

export default function Home() {
  //------------------Hooks-------------
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  //------------------use effect-------------
  useEffect(() => {
    async function fetchPosts() {
      const data = await getAllPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);
  //------------------functions------------------
  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await deletePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    toast.success("Post deleted");
  };

  if (loading) {
    return (
      <div className="bg-[#fbf8ff] min-h-screen flex items-center justify-center">
        <p className="text-slate-400 font-medium tracking-wide">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf8ff] flex-grow flex flex-col pt-10 pb-20">
      <main className="flex-grow max-w-7xl mx-auto px-6 w-full">
        
        <div className="flex justify-between items-end mb-10 border-b border-black/5 pb-6">
          <div>
            <h1 className="text-4xl font-black italic text-slate-900 tracking-tight uppercase">
              Community Posts
            </h1>
            <p className="text-slate-500 mt-2">
              Discover the latest insights from React developers.
            </p>
          </div>       
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-black/5 shadow-sm">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">
              article
            </span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No posts yet</h2>
            <p className="text-slate-500">Be the first to share something!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
