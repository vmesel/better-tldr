import React, { useState } from "react";

interface SummaryFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
}

export default function SummaryForm({ onSubmit, loading }: SummaryFormProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(input);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col items-center gap-4"
    >
      <textarea
        className="w-full h-40 p-4 border-2 border-gray-700 bg-[#23272f] text-white rounded-lg text-lg focus:outline-none focus:border-orange-400 resize-vertical placeholder-gray-400"
        placeholder="Paste any text you want to summarize..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-8 py-3 bg-orange-600 text-white rounded-lg text-lg font-semibold hover:bg-orange-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Summarizing..." : "Get TLDR"}
      </button>
    </form>
  );
} 