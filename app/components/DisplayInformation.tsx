"use client";
import React, { useEffect, useState } from "react";
import humanize from "humanize-anything";

interface DisplayInfoProps {
  label: string;
  essay: string;
}

export default function DisplayInformation({ label, essay }: DisplayInfoProps) {
  const [humanizeEssay, setHumanizeEssay] = useState("");

  useEffect(() => {
    // Step 1: Split into sentences properly
    const sentences = essay.match(/[^.!?]+[.!?]/g) || [essay];

    // Step 2: Create a "summary" by taking the first few sentences
    let summary = sentences.slice(0, 5).join(" ").trim();

    summary = summary
      .replace(/["';:]+/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/\s,|,\s/g, ", ")
      .replace(/\s\./g, ".")
      .trim();

    // Step 3: Humanize numbers inside the summary
    const processed = summary.replace(/\d+/g, (num) => humanize(Number(num)));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHumanizeEssay(processed);
  }, [essay]);

  return (
    <div className="flex justify-center mt-10 px-4 sm:px-6 lg:px-10">
      <div
        className="
          bg-white shadow-lg rounded-lg collapse collapse-open
          w-[95%] sm:w-11/12 md:w-10/12
          mx-auto
        "
      >
        <div className="collapse-title flex flex-col items-center p-2">
          <label className="text-black text-lg mb-3 font-semibold text-center">
            {label}
          </label>
        </div>

        <div className="collapse-content text-sm p-4 flex justify-center">
          <p className="text-black mb-3 font-semibold whitespace-pre-wrap text-center w-full">
            {humanizeEssay}
          </p>
        </div>
      </div>
    </div>
  );
}
