import { supabase } from "./supabaseClient";

export async function clearHistory() {
  const { error } = await supabase
    .from("history")
    .delete()
    .not("id", "is", null);

  if (error) {
    console.log(error);
    throw error;
  }
}
