import React, { useState } from "react";

export default function ReviewForm({ packageId, onNewReview }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🧠 Simulate optimistic update + fake API delay
  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return alert("Please enter a review!");

    const optimisticReview = {
      id: Date.now(),
      name: name || "Anonymous",
      rating,
      text,
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    // Add to UI immediately
    onNewReview(optimisticReview);

    setLoading(true);

    // Simulate backend delay (1.5s)
    setTimeout(() => {
      const finalReview = { ...optimisticReview, optimistic: false };
      onNewReview(finalReview, optimisticReview.id);
      setLoading(false);
      setName("");
      setText("");
      setRating(5);
      setPreview(false);
    }, 1500);
  }

  return (
    <div className="border border-slate-300 rounded-xl p-4 mb-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        Write a Review
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-md px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded-md px-2 py-1 text-sm text-black"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
        </div>

        {/* Review Text */}
        <textarea
          rows={3}
          placeholder="Write your review..."
          className="border rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* Toggle Preview */}
        <button
          type="button"
          onClick={() => setPreview((prev) => !prev)}
          className="text-xs text-indigo-500 underline w-fit"
        >
          {preview ? "Hide Preview" : "Show Preview"}
        </button>

        {/* Live Preview */}
        {preview && (
          <div className="border-t pt-2 mt-2 text-sm text-gray-700">
            <strong>Preview:</strong>
            <div className="mt-1">
              <div className="text-yellow-500">
                {"⭐".repeat(rating)} ({rating}/5)
              </div>
              <p className="text-gray-800 mt-1">{text || "No review text"}</p>
              <div className="text-xs text-gray-400 mt-1">
                — {name || "Anonymous"}
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 mt-2 text-sm font-medium text-white rounded-md ${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
