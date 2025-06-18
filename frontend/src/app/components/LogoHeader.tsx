import React from "react";

export default function LogoHeader() {
  return (
    <>
      <h1
        className="text-6xl sm:text-8xl font-extrabold mb-8 mt-16"
        style={{
          fontFamily: "'Dancing Script', cursive",
          letterSpacing: "0.05em",
          color: "#ff8800",
          textShadow: "0 2px 16px #0008"
        }}
      >
        Better TLDR
      </h1>
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
        rel="stylesheet"
      />
    </>
  );
} 