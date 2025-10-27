// src/components/ReviewList.jsx
import React from "react";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="text-slate-400 text-sm">No reviews yet.</div>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {reviews.map((r) => (
        <div
          key={r.id}
          className={`p-3 border rounded-md ${
            r.optimistic ? "border-dashed opacity-80" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <h5 className="font-semibold text-sm">{r.name}</h5>
            <span className="text-xs text-gray-400">
              {new Date(r.createdAt).toLocaleString()}
            </span>
          </div>

          <div className="text-yellow-500 text-sm mb-1">
            {"⭐".repeat(r.rating)}{" "}
            <span className="text-gray-500">({r.rating}/5)</span>
          </div>

          <p className="text-sm text-gray-800">{r.text}</p>

          {r.saving && <div className="text-xs text-gray-400 mt-1">Saving…</div>}
        </div>
      ))}
    </div>
  );
}
