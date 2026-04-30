export default function Home() {
  return (
    <div>
      <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
        <main className="flex-grow max-w-7xl mx-auto px-6 mt-10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Hero Post */}
            <article className="lg:col-span-8 glass-card rounded-xl overflow-hidden group cursor-pointer">
              <div className="relative h-[400px] overflow-hidden">
                <img
                  alt="Hero"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070"
                />
                <span className="absolute top-6 left-6 bg-white/90 backdrop-blur text-indigo-600 font-bold text-xs px-3 py-1 rounded-sm border">
                  LATEST
                </span>
              </div>
              <div className="p-8">
                <h1 className="text-4xl font-black mb-4 group-hover:text-indigo-600 transition-colors">
                  The React 19 Revolution
                </h1>
                <p className="text-slate-600 text-lg mb-6 line-clamp-3">
                  A deep dive into experimental features and architectural
                  shifts.
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100"
                    className="w-10 h-10 rounded-full"
                    alt="author"
                  />
                  <div>
                    <p className="font-bold text-sm">Sarah Chen</p>
                    <p className="text-slate-400 text-xs">
                      Oct 24, 2024 · 8 min read
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              <div className="glass-card rounded-xl p-6 group cursor-pointer">
                <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">
                  Tutorial
                </span>
                <h2 className="text-xl font-bold mt-2 group-hover:text-indigo-600">
                  TypeScript Generics
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                  Master advanced type safety patterns.
                </p>
              </div>
              {/* كرر المقالات الجانبية هنا */}
            </aside>
          </div>
        </main>

        <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
