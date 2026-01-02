import { supabase } from "../lib/supabaseClient";

export async function saveHistory(url: string, summary: string) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error Fetching User: ", error.message);
  }

  if (!user) {
    throw new Error("User not logging");
  }

  const { error: insertError } = await supabase
    .from("history")
    .insert([{ user_id: user.id, url, summary }]);

  if (insertError) {
    console.error("Error Saving History: ", insertError.message);
  }
}
