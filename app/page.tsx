"use client";
import Navbar from "./components/Navbar";
import Accordion from "./components/Accordion";
import DisplayInformation from "./components/DisplayInformation";
import { useState } from "react";

export default function Home() {
  const [essay, setEssay] = useState("");

  return (
    <>
      {/* Navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
        <Navbar />
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-8 lg:px-16 flex flex-col md:flex-row gap-6">
        {/* Accordion Section */}
        <section className="flex-1 w-full md:max-w-md">
          <Accordion onScrape={(result: string) => setEssay(result)} />
        </section>

        {/* Display Section */}
        <section className="flex-1 w-full">
          <DisplayInformation label="RESULT:" essay={essay} />
        </section>
      </main>
    </>
  );
}
