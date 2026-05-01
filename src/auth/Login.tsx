import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type ILoginFormInput } from "../types/ILogin";
import { loginUser } from "../services/login";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginFormInput) => {
    setIsLoading(true);
    await loginUser(data.email, data.password);
    toast.success("Welcome back!");
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1a1b22] font-sans relative overflow-hidden flex flex-col">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#dee0ff] opacity-30 blur-3xl z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#b6ebff] opacity-30 blur-3xl z-0"></div>

      <main className="w-full max-w-screen-2xl mx-auto px-6 flex items-center justify-center relative z-10 flex-grow py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <NavLink to="/">
              <h1 className="text-5xl font-black tracking-tighter italic uppercase text-[#1a1b22] hover:text-[#24389c] transition-colors">
                The Daily React
              </h1>
            </NavLink>
            <p className="text-lg text-[#454652] mt-4">
              Access your developer dashboard.
            </p>
          </div>

          <div className="glass-card rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#1a1b22] mb-8">
              Sign In
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <label
                  className="font-bold text-[#454652] uppercase tracking-widest text-[10px]"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  className="input-filled w-full py-3 px-4 border-b-2 text-[#1a1b22] placeholder:text-slate-300"
                  id="email"
                  placeholder="developer@example.com"
                  type="email"
                />
                {errors.email && (
                  <span className="text-red-500 text-[10px] font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-bold text-[#454652] uppercase tracking-widest text-[10px]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  className="input-filled w-full py-3 px-4 border-b-2 text-[#1a1b22] placeholder:text-slate-300"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                />
                {errors.password && (
                  <span className="text-red-500 text-[10px] font-medium">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                className="w-full mt-4 bg-gradient-to-r from-[#24389c] to-[#00d2ff] text-white font-bold py-4 rounded uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                {!isLoading && (
                  <span className="material-symbols-outlined">login</span>
                )}
              </button>

              <div className="text-center mt-2">
                <p className="text-sm text-[#454652]">
                  Don't have an account?{" "}
                  <NavLink
                    className="font-bold text-[#24389c] hover:text-[#00d2ff] transition-colors"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <NavLink
              to="/"
              className="text-sm text-[#454652] hover:text-[#24389c] transition-colors inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>
              Back to Home
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
}
