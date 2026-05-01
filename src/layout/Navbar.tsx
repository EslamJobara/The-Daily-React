import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Signed out successfully");
      setDropdownOpen(false);
      navigate("/login");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-all hover:text-indigo-600 ${
      isActive
        ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
        : "text-slate-500 dark:text-slate-400"
    }`;

  // Get user display name from metadata or email
  const displayName =
    user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
        </nav>

        <div className="flex items-center gap-4">
          {loading ? (
            /* Skeleton placeholder while auth state loads */
            <div className="w-20 h-9 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          ) : user ? (
            /* ─── Logged In State ─── */
            <>
              <NavLink to="/add-post">
                <button className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-5 py-2 hover:opacity-90 shadow-md transition-opacity text-sm uppercase tracking-wide cursor-pointer">
                  Add Post
                </button>
              </NavLink>

              {/* Profile avatar + dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 select-none"
                  title={displayName}
                >
                  {initials}
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-60 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Sign out */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center gap-3 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        logout
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ─── Logged Out State ─── */
            <>
              <NavLink to="/login">
                <button className="bg-transparent text-indigo-600 dark:text-indigo-400 font-bold px-5 py-2 border-[1.5px] border-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-900 transition-colors text-sm uppercase tracking-wide cursor-pointer">
                  Login
                </button>
              </NavLink>

              <NavLink to="/register">
                <button className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-5 py-2 hover:opacity-90 shadow-md transition-opacity text-sm uppercase tracking-wide cursor-pointer">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
