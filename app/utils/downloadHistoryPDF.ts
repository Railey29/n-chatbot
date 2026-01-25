// utils/downloadHistoryPDF.ts
import jsPDF from "jspdf";

export interface HistoryItem {
  url: string;
  summary?: string;
  created_at?: string;
}

export function downloadHistoryPDF(history: HistoryItem[]) {
  const doc = new jsPDF();
  let y = 20;

  // -----------------------------
  // PDF Title
  // -----------------------------
  doc.setFontSize(20);
  doc.setTextColor(30, 30, 30);
  doc.text("Search History", 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  // -----------------------------
  // Iterate over history items
  // -----------------------------
  history.forEach((item, index) => {
    // Page break
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    // Entry number and URL Label
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 204);
    doc.text(`${index + 1}. URL:`, 10, y);
    y += 6;

    // URL Text - clean the URL
    const cleanUrl = item.url.replace(/[^\x00-\x7F]/g, ""); // Remove non-ASCII characters
    const urlLines = doc.splitTextToSize(cleanUrl, 180);
    doc.setFontSize(10);
    doc.setTextColor(0, 51, 153);
    doc.text(urlLines, 12, y);
    y += urlLines.length * 5;

    // Created date
    if (item.created_at) {
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        `Created at: ${new Date(item.created_at).toLocaleString()}`,
        12,
        y,
      );
      y += 5;
    }

    // Summary - clean special characters
    doc.setFontSize(10);
    doc.setTextColor(0);
    const cleanSummary = (item.summary || "No summary available.")
      .replace(/[^\x00-\x7F]/g, "") // Remove non-ASCII
      .replace(/\s+/g, " ") // Normalize whitespace
      .trim();

    const summaryLines = doc.splitTextToSize(cleanSummary, 180);
    doc.text(summaryLines, 12, y);
    y += summaryLines.length * 5 + 8;

    // Divider line
    doc.setDrawColor(200);
    doc.setLineWidth(0.2);
    doc.line(10, y, 200, y);
    y += 6;
  });

  // -----------------------------
  // Save PDF with date
  // -----------------------------
  const today = new Date().toISOString().slice(0, 10);
  doc.save(`search_history_${today}.pdf`);
}
