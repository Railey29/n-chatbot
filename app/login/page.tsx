"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginController } from "../controller/LoginController";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await loginController(email, password);
      console.log(`Login Result ${result}`);
      alert("Login");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <img
            src="logo.png"
            alt="logo"
            className="h-20 p-3cursor-pointer mx-auto"
            style={{ filter: "brightness(0) saturate(100%)" }}
          />
          <p className="text-center text-black mb-6 text-lg font-semibold">
            Your Gateway to Smarter web scraping - fast , reliable and free.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
              className="w-full px-4 py-2 text-black border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-800"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}"
                required
                className="w-full px-4 py-2 text-black border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-blue-500 hover:underline"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
              <a href="/forgot">Forgot Password?</a>
            </div>
            <div className="text-right text-sm text-blue-500 hover:underline cursor-pointer">
              <a href="/register">Don&apos;t have an account?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
