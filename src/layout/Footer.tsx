export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-inter text-xs uppercase tracking-widest border-t border-black/5 dark:border-white/10 w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm font-bold text-slate-900 dark:text-white">
        The Daily React
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="https://github.com/EslamJobara"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="https://www.linkedin.com/in/eslamajobara/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="https://drive.google.com/drive/folders/1ZANUA0fNm2DDLJax6jcR92IRrXlvMUYk?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>
        <a
          className="text-slate-400 hover:text-indigo-500 hover:underline underline-offset-4"
          href="#"
        >
          Profile
        </a>
      </div>
      <div className="text-center md:text-right text-slate-400">
        © 2026 The Daily React. Technical precision meets aesthetic rigor.
      </div>
    </footer>
  );
}
