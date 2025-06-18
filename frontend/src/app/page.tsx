"use client";
import React, { useRef, useState, useEffect } from "react";
import LogoHeader from "./components/LogoHeader";
import SummaryForm from "./components/SummaryForm";
import SummaryDisplay from "./components/SummaryDisplay";

interface SummaryEntry {
  input: string;
  summary: string;
}

const SUMMARIZE_API = process.env.NEXT_PUBLIC_SUMMARIZE_API || "http://localhost:8000/summarize";

export default function Home() {
  const [summaries, setSummaries] = useState<SummaryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Load summaries from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("summaries");
    if (stored) setSummaries(JSON.parse(stored));
  }, []);

  // Save summaries to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("summaries", JSON.stringify(summaries));
  }, [summaries]);

  async function handleSummarize(input: string) {
    let summary = "";
    setLoading(true);

    const response = await fetch(SUMMARIZE_API, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: input,
    });

    if (!response.body) {
      summary = "No response body";
      setSummaries((prev) => [...prev, { input, summary }]);
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        summary += decoder.decode(value);
        summaryRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setSummaries((prev) => [...prev, { input, summary }]);
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#181818] to-[#23272f] p-8" style={{ color: "#fff" }}>
        <LogoHeader />
        <SummaryForm onSubmit={handleSummarize} loading={loading} />
        <div className="w-full max-w-2xl mt-8 flex flex-col gap-6">
          <hr/>
          <h2 className="text-2xl font-bold mb-4 text-center">Summaries</h2>
          {summaries.map((entry, idx) => (
            <div key={idx} className="bg-[#181818] rounded-lg shadow border border-gray-700 p-4">
              <div className="mb-2 text-sm text-gray-400">
                <span className="font-semibold text-orange-400">Excerpt:</span> {entry.input.slice(0, 100)}{entry.input.length > 100 ? "..." : ""}
              </div>
              <SummaryDisplay
                ref={idx === summaries.length - 1 ? summaryRef : undefined}
                summary={entry.summary}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}