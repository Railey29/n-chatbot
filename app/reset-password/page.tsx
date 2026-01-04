"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Password successfully updated");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-5"
      >
        <h1 className="text-center text-xl sm:text-2xl font-semibold text-black">
          Reset Password
        </h1>

        <p className="text-center text-sm sm:text-base text-gray-600">
          Enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            px-4 py-2.5
            text-black
            placeholder-gray-600
            border border-gray-400
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-gray-700
            focus:border-gray-700
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-2.5
            rounded-md
            hover:bg-gray-800
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
