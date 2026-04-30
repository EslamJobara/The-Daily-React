import { useForm } from "react-hook-form";
import type { ILoginFormInput } from "../types/ILogin";
import { NavLink } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: (data: ILoginFormInput) => void = (data) => {
    console.log("Form Data:", data);
    // هنا هتعمل الـ API Call بتاعك
  };

  return (
    <div className="bg-gradient-to-br from-[#efedf6] to-[#ffffff] min-h-screen text-[#1a1b22] antialiased flex flex-col font-sans selection:bg-[#00d2ff] selection:text-[#00566a]">
      <main className="flex-grow flex items-center justify-center p-6 pt-24 pb-20 relative overflow-hidden">
        {/* الدائرة الزخرفية الخلفية */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#24389c]/10 to-[#00677f]/10 blur-3xl opacity-50"></div>
        </div>

        {/* كارت اللوجن الزجاجي */}
        <div className="relative z-10 w-full max-w-[440px] bg-white/80 backdrop-blur-[12px] border border-[#c5c5d4]/30 rounded-xl p-10 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-center mb-2">
            <h1 className="text-3xl font-black tracking-tighter italic text-[#1a1b22] mb-2">
              <NavLink to="/">The Daily React</NavLink>
            </h1>
            <p className="text-[#454652] text-sm">
              Access your developer dashboard.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Email Field */}
            <div className="flex flex-col relative">
              <label
                className="font-bold text-[#454652] mb-2 uppercase tracking-widest text-[10px]"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full bg-transparent border-0 border-b-2 ${
                  errors.email ? "border-red-500" : "border-[#24389c]"
                } text-[#1a1b22] px-4 py-3 focus:ring-0 focus:border-[#00677f] transition-colors duration-200 placeholder:text-slate-300`}
                id="email"
                placeholder="developer@example.com"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-[10px] mt-1 font-medium">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col relative">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="font-bold text-[#454652] uppercase tracking-widest text-[10px]"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <input
                {...register("password", { required: "Password is required" })}
                className={`w-full bg-transparent border-0 border-b-2 ${
                  errors.password ? "border-red-500" : "border-[#24389c]"
                } text-[#1a1b22] px-4 py-3 focus:ring-0 focus:border-[#00677f] transition-colors duration-200 placeholder:text-slate-300`}
                id="password"
                placeholder="••••••••"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-[10px] mt-1 font-medium">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="rounded border-[#c5c5d4] text-[#24389c] focus:ring-[#24389c]"
              />
              <span className="text-sm text-[#454652]">Remember me</span>
            </div>

            {/* Submit Button */}
            <button
              className="mt-2 w-full bg-gradient-to-r from-[#24389c] to-[#00677f] text-white font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-200 flex justify-center items-center gap-2 active:scale-[0.98] cursor-pointer"
              type="submit"
            >
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[20px]">
                login
              </span>
            </button>
          </form>

          <div className="mt-4 text-center border-t border-[#c5c5d4]/20 pt-6">
            <p className="text-[#454652] text-sm">
              Don't have an account?{" "}
              <NavLink
                className="font-bold text-[#24389c] hover:underline underline-offset-4"
                to="/register"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
