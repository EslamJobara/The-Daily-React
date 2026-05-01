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
  const DeletePost = (postId: string) => {
    toast((t) => (
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-red-500">Delete post?</span>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await deletePost(postId);
              setPosts((prev) => prev.filter((p) => p.id !== postId));
              toast.success("Deleted");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold uppercase"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-slate-100 text-slate-500 px-3 py-1 rounded text-xs font-bold uppercase"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="bg-[#fbf8ff] min-h-screen flex items-center justify-center">
        <p className="text-slate-400 font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf8ff] flex-grow flex flex-col pt-10 pb-20">
      <main className="flex-grow max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-end mb-10 border-b border-black/5 pb-6">
          <div>
            <h1 className="text-4xl font-black italic text-slate-900 uppercase">
              Community Posts
            </h1>
            <p className="text-slate-500 mt-2">Latest React insights.</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded border border-black/5">
            <h2 className="text-xl font-bold text-slate-900">No posts yet</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={DeletePost} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}