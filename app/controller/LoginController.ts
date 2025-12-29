import { supabase } from "../lib/supabaseClient";

export const loginController = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    console.log("Login successfully: " + data);

    return {
      success: true,
      message: "Login Successful!",
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    alert(error);
  }
};

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("Get user Error: ", error);
    return null;
  }

  return user;
};

export const checkAuth = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.log("Seassion Error: " + error);
    return null;
  }

  return session;
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
