"use client";
import { useState } from "react";

const options = [
  { key: "3d", label: "3 Days" },
  { key: "7d", label: "7 Days" },
  { key: "10d", label: "10 Days" },
  { key: "30d", label: "30 Days" },
];

export default function TimeFilterBar({ onChange }) {
  const [active, setActive] = useState("3d");

  const click = (k) => {
    setActive(k);
    onChange?.(k);
  };

  return (
    <div className="card p-2 flex gap-2">
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => click(key)}
          className={`px-3 py-1.5 rounded-lg text-sm border transition
            ${active === key
              ? "bg-[var(--brand)] text-white border-transparent"
              : "bg-transparent border-slate-300/40 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
