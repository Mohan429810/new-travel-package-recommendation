import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

function useAuth() {
  const raw = localStorage.getItem("voyage_user");
  return raw ? JSON.parse(raw) : null;
}

export default function Dashboard() {
  const user = useAuth();
  const controls = useAnimation();

  // Infinite horizontal scroll animation for recommended trips
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 50,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-200">
        <h2 className="text-3xl font-bold text-cyan-400">You are not logged in</h2>
        <p className="mt-3 text-slate-300">
          Please login to access your dashboard and saved travel preferences.
        </p>
      </div>
    );
  }

  // Demo recommended trips (mock)
  const recommendedTrips = [
    {
      name: "Bali Getaway",
      location: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      price: "₹45,000",
      rating: 4.8,
    },
    {
      name: "Swiss Alps Escape",
      location: "Switzerland",
      image:
        "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=800&q=80",
      price: "₹95,000",
      rating: 4.9,
    },
    {
      name: "Kerala Backwaters",
      location: "India",
      image:
        "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80",
      price: "₹25,000",
      rating: 4.6,
    },
    {
      name: "Santorini Escape",
      location: "Greece",
      image:
        "https://images.unsplash.com/photo-1505739775207-0f7b4b20e57d?auto=format&fit=crop&w=800&q=80",
      price: "₹70,000",
      rating: 4.7,
    },
    {
      name: "Dubai Adventure",
      location: "UAE",
      image:
        "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?auto=format&fit=crop&w=800&q=80",
      price: "₹60,000",
      rating: 4.5,
    },
  ];

  return (
    <div className="text-slate-200">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden rounded-b-3xl">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="Dashboard Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl font-extrabold text-cyan-400">
            Welcome back, {user.name} 👋
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Here’s your personalized travel dashboard — explore your preferences,
            view recommendations, and plan your next adventure.
          </p>
        </motion.div>
      </section>

      {/* USER SUMMARY CARDS */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Saved Preferences",
            value: Object.keys(user.preferences || {}).length || 0,
          },
          { title: "Trips Explored", value: 12 },
          { title: "Member Since", value: "2024" },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 text-center"
          >
            <h3 className="text-cyan-400 font-semibold text-lg mb-2">
              {card.title}
            </h3>
            <p className="text-4xl font-bold text-white">{card.value}</p>
          </motion.div>
        ))}
      </section>

      {/* SAVED PREFERENCES */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Your Saved Preferences
        </h2>
        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
          <pre className="text-sm bg-slate-800 p-4 rounded overflow-x-auto">
            {JSON.stringify(user.preferences || {}, null, 2)}
          </pre>
        </div>
      </section>

      {/* RECOMMENDED TRIPS — INFINITE SCROLL */}
      <section className="bg-slate-950 py-16 overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-10">
          Recommended for You
        </h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={controls}
          >
            {[...recommendedTrips, ...recommendedTrips].map((trip, i) => (
              <div
                key={i}
                className="min-w-[300px] bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-transform hover:scale-[1.05]"
              >
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {trip.name}
                  </h3>
                  <p className="text-sm text-cyan-400">{trip.location}</p>
                  <div className="flex justify-between items-center mt-3 text-slate-400">
                    <span>{trip.price}</span>
                    <span>⭐ {trip.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LOGOUT / FOOTER */}
      <section className="text-center py-10">
        <button
          onClick={() => {
            localStorage.removeItem("voyage_user");
            window.location.reload();
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-[1.05]"
        >
          Logout
        </button>
      </section>
    </div>
  );
}