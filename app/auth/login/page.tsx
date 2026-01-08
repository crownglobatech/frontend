"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import LoadingDots from "@/app/components/general/LoadingDots";
import { setAuthSuccess } from "@/app/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { User } from "@/lib/types";
import { logger } from "@/lib/logger";

type LoginResponse = {
  message: string;
  user: User;
  token: string;
};
export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { notify } = useNotification();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      notify("Enter email and password", "error");
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message);
        notify(errorData.message, "error", "Error");
        throw new Error(
          errorData.message || `Login failed (status ${res.status})`
        );
      }
      const data: LoginResponse = await res.json();
      dispatch(
        setAuthSuccess({
          user: data.user,
          token: data.token,
          role: data.user.role,
        })
      );
      notify("Redirecting you to dashboard!", "success", "Login Successful");
      if (data.user.role === "service_provider") {
        router.replace("/provider/dashboard");
      } else if (data.user.role === "admin") {
        router.replace("/workspace/dashboard");
      } else {
        router.replace("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      logger.error("Login error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex md:flex-row flex-col w-full min-h-screen">
      {/* Left side */}
      <div className="top-0 sticky flex flex-col justify-between bg-[var(--primary-color)] px-8 py-16 w-full md:w-1/2 min-h-screen">
        {/* logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="text-[var(--font-md)]"
        >
          <span className="font-thin text-[var(--neutral-white)]/70">
            Crown-
          </span>
          <span className="font-extrabold text-[var(--neutral-white)]">
            Haven
          </span>
        </motion.div>

        {/* auth intro */}
        <div>
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="max-w-[90%] font-bold text-[32px] text-white md:text-[50px] leading-tight"
          >
            Welcome Back to Crown-Haven{" "}
          </motion.h2>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="pt-4 max-w-[90%] font-thin text-white/70"
          >
            Your trusted space for living, renting, or offering services. Log in
            to stay connected and keep moving forward.
          </motion.p>
        </div>

        {/* footnote */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <span className="text-[12px] text-[var(--neutral-white)]/70">
            &copy; 2025 Crown-Haven. All rights reserved.
          </span>
        </motion.div>
      </div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.9,
          ease: "easeIn",
        }}
        className="relative flex flex-1 justify-center items-center bg-white px-8 py-16 w-full md:w-1/2 h-screen overflow-y-auto"
      >
        {/* cta */}
        <div className="relative py-8 w-full">
          <div className="relative mx-auto max-w-[400px]">
            <div className="-top-10 right-0 absolute">
              <span className="text-[12px] text-[var(--foundation-neutral)]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-bold text-[var(--primary-color)]"
                >
                  Sign up
                </Link>
              </span>
            </div>
            <div>
              <h2 className="font-bold text-[30px] text-[var(--heading-color)]">
                Login
              </h2>
              <p className="text-[14px] text-[var(--foundation-neutral)]">
                Welcome back! Please login to your account.
              </p>
            </div>
            <form
              className="flex flex-col items-center gap-[20px] mt-12"
              onSubmit={handleSubmit}
            >
              {/* Email */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm"
                />
              </div>
              {/* Password */}
              <div className="flex flex-col w-full">
                <label className="mb-1 font-semibold text-[var(--heading-color)] text-sm">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm"
                />
                <Link
                  href="/auth/forgot-password"
                  className="self-end pt-4 font-semibold text-[12px] text-[var(--secondary-color)]"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center gap-2 mt-8">
                <button
                  type="submit"
                  className="bg-[var(--primary-color)] px-12 py-3 rounded-md font-semibold text-white text-sm cursor-pointer"
                >
                  {loading ? <LoadingDots /> : "Login"}
                </button>
                {/* {error && <p className='text-[12px] text-red-600'>{error}</p>} */}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
