import React, { useState } from 'react';
import trips from '../data/trips.json';
import PackageCard from '../components/PackageCard';

export default function Recommendation() {
  const [form, setForm] = useState({
    destination: '',
    type: '',
    duration: '',
    season: '',
    budget: '',
    source: '',
    minPrice: '',
    maxPrice: '',
    amenities: [],
    rating: '',
  });
  const [results, setResults] = useState([]);

  function handleAmenityChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setForm({ ...form, amenities: [...form.amenities, value] });
    } else {
      setForm({
        ...form,
        amenities: form.amenities.filter((a) => a !== value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const res = trips.filter((t) => {
      if (
        form.destination &&
        !String(t.Destination || '')
          .toLowerCase()
          .includes(form.destination.toLowerCase())
      )
        return false;
      if (
        form.type &&
        form.type !== 'Any' &&
        String(t.Destination_Type || '').toLowerCase() !==
          form.type.toLowerCase()
      )
        return false;
      if (
        form.duration &&
        form.duration !== 'Any' &&
        !String(t.Duration || '')
          .toLowerCase()
          .includes(form.duration.toLowerCase())
      )
        return false;
      if (
        form.season &&
        form.season !== 'Any' &&
        String(t.Season || '').toLowerCase() !== form.season.toLowerCase()
      )
        return false;

      const price = Number(t.Package_Price || t.Cost || 0);
      if (form.minPrice && price < Number(form.minPrice)) return false;
      if (form.maxPrice && price > Number(form.maxPrice)) return false;
      if (form.budget && price > Number(form.budget)) return false;

      if (
        form.source &&
        form.source !== 'Any' &&
        String(t.Source || '').toLowerCase() !== form.source.toLowerCase()
      )
        return false;

      if (
        form.amenities.length > 0 &&
        !form.amenities.every((a) => (t.Amenities || []).includes(a))
      )
        return false;

      if (form.rating && Number(t.Star_Rating || 0) < Number(form.rating))
        return false;

      return true;
    });

    setResults(res);
  }

  const types = ['Destination-type', ...Array.from(new Set(trips.map((t) => t.Destination_Type).filter(Boolean)))];
  const seasons = ['Season', ...Array.from(new Set(trips.map((t) => t.Season).filter(Boolean)))];
  const sources = ['Pickup-point', ...Array.from(new Set(trips.map((t) => t.Source).filter(Boolean)))];
  const amenitiesList = ['WiFi', 'Meals', 'Transport', 'Guide', 'Activities'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Get Personalized Recommendations</h1>

      {/* Main responsive layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* ---------- LEFT SIDE (Sidebar Filters) ---------- */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[300px] flex-shrink-0 flex flex-col gap-4 bg-primary-900/30 p-6 rounded-xl border border-primary-800"
        >
          <h3 className="text-lg font-semibold mb-1">Basic Filters</h3>
          <input
            placeholder="Destination (e.g. Goa)"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            placeholder="Duration (e.g. 4 Days / 3 Nights)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40"
          />
          <select
            value={form.season}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40"
          >
            {seasons.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* ---------- PRICE RANGE ---------- */}
          <h3 className="text-lg font-semibold mt-4">Price Range (₹)</h3>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={form.minPrice}
              onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
              className="w-1/2 px-3 py-2 rounded-md bg-primary-900/40"
            />
            <input
              type="number"
              placeholder="Max"
              value={form.maxPrice}
              onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
              className="w-1/2 px-3 py-2 rounded-md bg-primary-900/40"
            />
          </div>

          {/* ---------- AMENITIES ---------- */}
          <h3 className="text-lg font-semibold mt-4">Amenities</h3>
          <div className="flex flex-col gap-1">
            {amenitiesList.map((a) => (
              <label key={a} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={a}
                  checked={form.amenities.includes(a)}
                  onChange={handleAmenityChange}
                />
                <span>{a}</span>
              </label>
            ))}
          </div>

          {/* ---------- STAR RATING ---------- */}
          <h3 className="text-lg font-semibold mt-4">Star Rating</h3>
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40"
          >
            <option value="">Select Ratings</option>
            <option value="3">3★ & above</option>
            <option value="4">4★ & above</option>
            <option value="5">5★ only</option>
          </select>

          {/* ---------- SOURCE ---------- */}
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40"
          >
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <button className="px-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition mt-3">
            Apply Filters
          </button>
        </form>

        {/* ---------- RIGHT SIDE (Recommended Packages) ---------- */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            Matches ({results.length})
          </h2>
          {results.length === 0 && (
            <p className="text-gray-400">
              No recommendations found yet. Try adjusting your filters.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r, idx) => (
              <PackageCard key={idx} p={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
