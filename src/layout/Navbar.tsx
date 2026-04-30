import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinkClasses = ({ isActive }) =>
    `font-medium transition-all hover:text-indigo-600 ${
      isActive
        ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
        : "text-slate-500 dark:text-slate-400"
    }`;

  return (
    <header className="bg-slate-50/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 border-b border-black/5 dark:border-white/10 w-full z-50 transition-colors duration-300">
      <div className="flex justify-between items-center px-8 h-20 max-w-screen-2xl mx-auto">
        <NavLink
          to="/"
          className="text-2xl font-black tracking-tighter italic text-slate-900 dark:text-white decoration-none"
        >
          The Daily React
        </NavLink>

        <nav className="hidden md:flex gap-8 items-center font-inter tracking-tight uppercase text-[13px] font-bold">
          <NavLink to="/latest" className={navLinkClasses}>
            Latest
          </NavLink>
          <NavLink to="/edit-post" className={navLinkClasses}>
            Edit Post
          </NavLink>
          <NavLink to="/tutorials" className={navLinkClasses}>
            Tutorials
          </NavLink>
          <NavLink to="/community" className={navLinkClasses}>
            Community
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <NavLink to="/login">
            <button className="bg-transparent text-indigo-600 dark:text-indigo-400 font-bold px-5 py-2 border-[1.5px] border-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-900 transition-colors text-sm uppercase tracking-wide cursor-pointer">
              Login
            </button>
          </NavLink>

          <NavLink to="/add-post">
            <button className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-5 py-2 hover:opacity-90 shadow-md transition-opacity text-sm uppercase tracking-wide cursor-pointer">
              Add Post
            </button>
          </NavLink>

          <button className="hidden sm:flex p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
