import React, { useState } from 'react';
import PackageCard from '../components/PackageCard';

export default function Recommendation() {
  const [form, setForm] = useState({
    source: '',
    destination: '',
    type: '', // Maps to Destination_Type
    season: '',
    duration: '', // Will be parsed to float
    budget: '', // Will be parsed to float
  });
  const [results, setResults] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Source: form.source,
          Destination: form.destination,
          Destination_Type: form.type,
          Season: form.season,
          Duration_Days: parseFloat(form.duration),
          User_Budget: parseFloat(form.budget),
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setResults(data);
      console.log('Recommendations:', data);
    } catch (error) {
      console.error('Error:', error);
      setResults([]);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Get Personalized Recommendations
      </h1>

      <div className="flex flex-col md:grid md:grid-cols-[320px_1fr] gap-6">
        {/* ---------- LEFT SIDE (Sidebar Filters) ---------- */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-primary-900/30 p-6 rounded-xl border border-primary-800 h-fit md:sticky md:top-6 w-full md:w-auto"
        >
          <h3 className="text-lg font-semibold mb-1">Basic Filters</h3>

          <input
            placeholder="Source (e.g. Delhi)"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40 w-full"
          />

          <input
            placeholder="Destination (e.g. Goa)"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40 w-full"
          />

          <input
            placeholder="Destination Type (e.g. Beach)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40 w-full"
          />

          <input
            type="number"
            placeholder="Duration (Days)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40 w-full"
          />

          <input
            placeholder="Season (e.g. Summer)"
            value={form.season}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40 w-full"
          />

          <input
            type="number"
            placeholder="Budget (₹)"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className="px-3 py-2 rounded-md bg-primary-900/40 w-full"
          />

          <button className="px-5 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition mt-3 w-full">
            Get Recommendations
          </button>
        </form>

        {/* ---------- RIGHT SIDE (Recommended Packages) ---------- */}
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Matches ({results.length})
          </h2>

          {results.length === 0 ? (
            <p className="text-gray-400 text-center md:text-left">
              No recommendations found yet. Try adjusting your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((r, idx) => (
                <PackageCard key={idx} p={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
