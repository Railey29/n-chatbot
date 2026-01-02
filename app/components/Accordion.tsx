"use client";
import React, { useState } from "react";
import { saveHistory } from "../controller/historyController";

interface AccordionProps {
  placeholder?: string;
  type?: string;
  onScrape: (result: string) => void; // create a method or function name it onScrape with parameter of result type string and return type is void
}

export default function Accordion({
  placeholder = "https://www.yourwebsite.com",
  type = "url",
  onScrape,
}: AccordionProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `/api/scrape?url=${encodeURIComponent(inputValue)}`
    );
    if (!res.ok) {
      console.log("Scrape Failed");
      return;
    }
    const data = await res.json();
    console.log("Scraped essay: ", data.essay);
    await saveHistory(inputValue, data.essay);
    onScrape?.(data.essay); // "?" is optional to pass the data , but in this case pass the data on result , pass the essay data on scrape , then the result have a data of essay because it passed
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="
bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto mt-20
        "
      >
        <div className="collapse-title flex flex-col items-center w-full max-w-md">
          <label className="text-black text-lg mb-3 font-semibold whitespace-pre-line text-center">
            Enter a URL{"\n"}(Uniform Resource Locator)
          </label>

          <input
            type={type}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            pattern="https?://.+"
            required
            className="
              text-black border-base-300 border-2 rounded-md
              w-[80%] sm:w-[90%] md:w-full
              mb-4 p-2 text-center
            "
          />

          <button
            type="submit"
            className="
              rounded border-base-200 border-2 bg-base-100
              w-[60%] sm:w-[70%] md:w-auto
              px-4 py-2 cursor-pointer
              text-center
            "
          >
            Scraping Information
          </button>
        </div>
      </div>
    </form>
  );
}
