"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Import Link
import { getHistory } from "../lib/getHistory";
import { clearAllHistory } from "../utils/clearAllHistory";
import { downloadHistoryPDF } from "../utils/downloadHistoryPDF";
import Button from "../components/button";

export default function HistoryPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<any[]>([]);
  const [cleaning, setCleaning] = useState(false);

  const handleClear = async () => {
    clearAllHistory(setHistory, setCleaning);
  };

  const handleDownloadPDF = async () => {
    downloadHistoryPDF(history);
  };

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center px-2 sm:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Search History
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            A record of all URLs you’ve scraped and summarized
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-6 flex flex-row gap-3">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>

          {/* Clear History */}
          <Button
            title={cleaning ? "Cleaning..." : "🗑 Clear History"}
            onNavigation={handleClear}
            disabled={cleaning}
            className="bg-red-600 text-white hover:bg-red-700"
          />

          {/* Download PDF */}
          <Button
            title="📄 Download PDF"
            onNavigation={handleDownloadPDF}
            disabled={history.length === 0}
            className="bg-green-600 text-white hover:bg-green-700"
          />
        </div>

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 sm:p-10 text-center shadow-sm">
            <span className="text-4xl sm:text-5xl mb-4">🕵️‍♂️</span>
            <p className="text-gray-600 font-medium text-base sm:text-lg">
              No history yet
            </p>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              Scrape a URL and it will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md"
              >
                {/* URL + Date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:underline break-words sm:break-normal"
                  >
                    {item.url}
                  </a>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-gray-100" />

                {/* Summary */}
                <p className="text-sm sm:text-base leading-relaxed text-gray-700 line-clamp-4 sm:line-clamp-6 break-words">
                  {item.summary || "No summary available."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
