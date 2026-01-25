import { clearHistory } from "../lib/clearHistory";

export async function clearAllHistory(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setHistory: (value: any[]) => void,
  setCleaning: (value: boolean) => void,
) {
  const confirmed = window.confirm(
    "Are you sure you want to clear all history?",
  );
  if (!confirmed) return;

  try {
    setCleaning(true);
    await clearHistory();
    setHistory([]);
  } finally {
    setCleaning(false);
  }
}
