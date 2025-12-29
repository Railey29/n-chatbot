import bcrypt from "bcryptjs";
import { hashPassword } from "../utils/register";
import { supabase } from "@/app/lib/supabaseClient";

export const handleRegisterController = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);
  console.log("Are they equal?", password === confirmPassword);
  console.log("Password length:", password.length);
  console.log("Confirm Password length:", confirmPassword.length);
  console.log("Password type:", typeof password);
  console.log("Confirm Password type:", typeof confirmPassword);

  if (password !== confirmPassword) throw new Error("password do not match");

  const hashedPassword = await hashPassword(password, 10);
  console.log("Hashed Password:", hashedPassword);

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    if (data.user && !data.session) {
      return {
        success: true,
        message: "please check your email to confirm your account",
        user: data.user,
      };
    }

    return {
      success: true,
      message: "Registration successful!",
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    alert("Registration error:" + error);
  }
};
