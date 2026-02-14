"use client";

import { useEffect } from "react";

const APP_STORE_ID = "6759177501";
const APP_STORE_URL = `https://apps.apple.com/app/rally/id${APP_STORE_ID}`;

export default function CatchAll() {
  useEffect(() => {
    window.location.href = APP_STORE_URL;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        ➡️ Redirecting to Rally...
      </h1>
      <p style={{ color: "#666" }}>
        If you&apos;re not redirected automatically,{" "}
        <a href={APP_STORE_URL} style={{ color: "#007AFF" }}>
          tap here
        </a>
      </p>
    </div>
  );
}
