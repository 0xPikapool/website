import React from "react";

export default function NotFound({
  what,
  id,
}: {
  what: string;
  id: string;
}): JSX.Element {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src="/img/pika_missing.jpg" />
      <br />
      <span style={{ fontFamily: "Cagliostro" }}>{what}</span>
      <code>{id}</code>
      <span style={{ fontFamily: "Cagliostro" }}>{`Not Found`}</span>
    </div>
  );
}
