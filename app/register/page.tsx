"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { handleRegisterController } from "../controller/registerController";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // i use FormData for API from the browser to get the all values in the form
    // and i use HTMLFormElement for DOM(Document Object Model)
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    try {
      const data = await handleRegisterController(
        email,
        password,
        confirmPassword
      );
      console.log("Registration result: ", data);
      alert(data?.message);
      router.push("/login");
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
            Register now and unlock smarter web scraping for free.
          </p>

          <form className="space-y-4" onSubmit={handleRegister}>
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
            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
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
              <a href="/login">Already Have an Account?</a>
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
