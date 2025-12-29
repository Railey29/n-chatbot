"use client";
import Navbar from "./components/Navbar";
import Accordion from "./components/Accordion";
import DisplayInformation from "./components/DisplayInformation";
import { useState } from "react";

export default function Home() {
  const [essay, setEssay] = useState("");
  return (
    <>
      <nav className="w-full">
        <Navbar />
      </nav>
      <main className="flex flex-col md:flex-row gap-4 p-4">
        {/* Accordion Section */}
        <div className="flex-1 w-full">
          <Accordion onScrape={(result: string) => setEssay(result)} />
        </div>

        {/* Display Section */}
        <div className="flex-1 w-full">
          <DisplayInformation label="RESULT:" essay={essay} />
        </div>
      </main>
    </>
  );
}
