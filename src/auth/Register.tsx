import { useForm } from "react-hook-form";
import type { IRegisterFormInput } from "../types/IReagister";
import { registerUser } from "../services/authService";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const password = watch("password");

  const onSubmit = async (data: IRegisterFormInput) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#fbf8ff] min-h-screen text-[#1a1b22] font-sans relative overflow-hidden flex flex-col">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#dee0ff] opacity-30 blur-3xl z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#b6ebff] opacity-30 blur-3xl z-0"></div>

      <main className="w-full max-w-screen-2xl mx-auto px-6 flex items-center justify-center relative z-10 flex-grow py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black tracking-tighter italic uppercase text-[#1a1b22]">
              The Daily React
            </h1>
            <p className="text-lg text-[#454652] mt-4">
              Join the editorial community.
            </p>
          </div>

          <div className="glass-card rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#1a1b22] mb-8">
              Create Account
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1">
                <label
                  className="font-bold text-[#454652] uppercase tracking-widest text-[10px]"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="input-filled w-full py-3 px-4 border-b-2 text-[#1a1b22] placeholder:text-slate-300"
                  id="name"
                  placeholder="Your full name"
                  type="text"
                />
                {errors.name && (
                  <span className="text-red-500 text-[10px] font-medium">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-bold text-[#454652] uppercase tracking-widest text-[10px]"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  className="input-filled w-full py-3 px-4 border-b-2 text-[#1a1b22] placeholder:text-slate-300"
                  id="email"
                  placeholder="you@example.com"
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" },
                  })}
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

              <div className="flex flex-col gap-1">
                <label
                  className="font-bold text-[#454652] uppercase tracking-widest text-[10px]"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="input-filled w-full py-3 px-4 border-b-2 text-[#1a1b22] placeholder:text-slate-300"
                  id="confirm-password"
                  placeholder="••••••••"
                  type="password"
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-[10px] font-medium">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <button
                className="w-full mt-4 bg-gradient-to-r from-[#24389c] to-[#00d2ff] text-white font-bold py-4 rounded uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? "Creating Account..." : "Register"}</span>
                {!isLoading && (
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                )}
              </button>

              <div className="text-center mt-2">
                <NavLink
                  className="text-sm font-bold text-[#24389c] hover:text-[#00d2ff] transition-colors"
                  to="/login"
                >
                  Already have an account? Login
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
