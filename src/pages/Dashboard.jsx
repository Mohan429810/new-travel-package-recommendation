import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import TopPicks from '../sections/TopPicks' 

function useAuth() {
  const raw = localStorage.getItem("loggedInUser");
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
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        {[
          { title: "Trips Explored", value: 0 },
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

      {/* FAVOURITE TRIPS */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
          Your Favourite Trips
        </h2>
        <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
          {(() => {
            const favs = JSON.parse(localStorage.getItem(`favourites_${user.email}`) || '[]');
            return favs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favs.map(p => (
                  <div key={p.Trip_ID} className="bg-slate-800 p-4 rounded-lg">
                    <img src={p.Image_URL} alt={p.Package_Title} className="w-full h-32 object-cover rounded mb-2" />
                    <h3 className="text-white font-semibold">{p.Package_Title}</h3>
                    <p className="text-slate-400 text-sm">{p.Destination}</p>
                    <p className="text-cyan-400 font-bold">₹ {Number(p.Package_Price || p.Cost || p.Price || 0).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No favourite trips yet. Start exploring and add some!</p>
            );
          })()}
        </div>
      </section>

      {/* RECOMMENDED TRIPS — INFINITE SCROLL */}
      <section className="bg-slate-950 p-16 overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-10">
          Recommended for You
        </h2>
        <div className="relative overflow-hidden flex gap-8">
            <TopPicks/>
        </div>
      </section>

      {/* LOGOUT / FOOTER */}
      <section className="text-center py-10">
        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            window.location.reload();
            alert("Logged out successfully!");
          }}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-[1.05]"
        >
          Logout
        </button>
      </section>
    </div>
  );
}
