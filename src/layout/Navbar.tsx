import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/signout";
import { DEFAULT_AUTHOR_IMAGE } from "./Avatar";

export default function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Signed out successfully");
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const displayName = user?.user_metadata?.name || "User";

  return (
    <header className="bg-slate-50/80 backdrop-blur-md dark:bg-slate-950/80 sticky top-0 border-b border-black/5 dark:border-white/10 w-full z-50 transition-colors duration-300">
      <div className="flex justify-between items-center px-8 h-20 max-w-screen-2xl mx-auto">
        <NavLink
          to="/"
          className="text-2xl font-black tracking-tighter italic text-slate-900 dark:text-white decoration-none"
        >
          The Daily React
        </NavLink>
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="text-slate-400 text-sm">Loading...</span>
          ) : user ? (
            <>
              <NavLink to="/add-post">
                <button className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-5 py-2 hover:opacity-90 shadow-md transition-opacity text-sm uppercase tracking-wide cursor-pointer">
                  Add Post
                </button>
              </NavLink>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 select-none border-2 border-transparent hover:border-indigo-400"
                  title={displayName}
                >
                  <img
                    src={DEFAULT_AUTHOR_IMAGE}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-60 bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-black/5 dark:border-white/10">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {displayName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

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
