export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-inter text-xs uppercase tracking-widest border-t border-black/5 dark:border-white/10 w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center max-w-screen-2xl mx-auto gap-6">
      <div className="text-sm font-bold text-slate-900 dark:text-white">
        The Daily React
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="#"
        >
          Terms
        </a>
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="#"
        >
          Privacy
        </a>
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="#"
        >
          RSS Feed
        </a>
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="#"
        >
          GitHub
        </a>
      </div>
      <div className="text-center md:text-right text-slate-400">
        © 2024 The Daily React. Technical precision meets aesthetic rigor.
      </div>
    </footer>
  );
}
