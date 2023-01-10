import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img src="/img/pikachu-running.gif" alt="Loading" />
    </div>
  );
}
