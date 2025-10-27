// src/pages/PackageDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import trips from "../data/trips.json";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

export default function PackageDetail() {
  const { id } = useParams(); // assuming route: /package/:id
  const pkg = trips.trips.find((t) => t.Trip_ID === id);

  const [reviews, setReviews] = useState([]);

  // Simulated fetch from backend or localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`reviews-${id}`);
    setReviews(stored ? JSON.parse(stored) : []);
  }, [id]);

  // Handle new reviews (optimistic + server)
  function handleNewReview(newReview, optimisticId) {
    // Optimistic
    if (newReview._failed) {
      setReviews((prev) => prev.filter((r) => r.id !== newReview.tempId));
      return;
    }

    if (optimisticId) {
      setReviews((prev) =>
        prev.map((r) => (r.id === optimisticId ? newReview : r))
      );
      return;
    }

    if (newReview.optimistic) {
      setReviews((prev) => [newReview, ...prev]);
      return;
    }

    setReviews((prev) => [newReview, ...prev]);
  }

  // Persist reviews in localStorage (optional)
  useEffect(() => {
    localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  if (!pkg) return <h3>Package not found!</h3>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{pkg.Package_Title}</h2>
      <p className="text-gray-600 mb-4">{pkg.Trip_Description}</p>

      {/* Review form */}
      <ReviewForm tripId={id} packageId={id} onNewReview={handleNewReview} />

      {/* Display reviews */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Customer Reviews</h3>
      <ReviewList tripId={id} reviews={reviews} />
    </div>
  );
}
