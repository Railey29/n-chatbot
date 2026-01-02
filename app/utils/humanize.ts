export function humanizeText(text: string): string {
  const cleaned = text
    .replace(/\s+/g, " ")
    .replace(/\b(\w+)\s+\1\b/gi, "$1")
    .replace(/([a-z]) ([A-Z])/g, "$1. $2")
    .trim();

  const sentences = cleaned.split(/(?<=\.)\s+/).filter(
    (s) =>
      // sentence quality checks
      s.length > 35 && // not too short
      !s.endsWith("the.") &&
      !s.endsWith("of the.") &&
      !s.endsWith("by.") &&
      s.split(" ").length >= 6 // enough words
  );

  // keep only 2–5 good sentences
  return sentences.slice(0, 5).join(" ");
}
