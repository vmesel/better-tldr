import React, { ForwardedRef, forwardRef, useState } from "react";

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay = forwardRef<HTMLDivElement, SummaryDisplayProps>(
  ({ summary }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    return (
      <div className="relative">
        <div
          ref={ref}
          className="w-full p-0 bg-transparent min-h-[80px] text-lg"
          style={{ whiteSpace: "pre-wrap", color: "#fff" }}
        >
          {summary}
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 bg-orange-600 text-white rounded text-sm font-semibold hover:bg-orange-700 transition focus:outline-none"
          type="button"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    );
  }
);

export default SummaryDisplay; 