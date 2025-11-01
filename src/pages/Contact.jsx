import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const bgImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  "https://i0.wp.com/traveltoyournature.com/wp-content/uploads/2023/07/beautiful-nature-india-1-1024x768.jpeg?resize=1024%2C768",
];

const infoCards = [
  {
    title: "Email Us",
    image: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
    info: "support@voyage.com",
  },
  {
    title: "Call Us",
    image: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
    info: "+91 98765 43210",
  },
  {
    title: "Visit Us",
    image: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
    info: "Hyderabad, India",
  },
];

export default function Contact() {
  const [bgIndex, setBgIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 120]); // Parallax motion

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-slate-200 overflow-hidden">
      {/* BACKGROUND SLIDESHOW */}
      {bgImages.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt="Background"
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: i === bgIndex ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      {/* HERO TEXT */}
      <section className="relative z-10 h-[70vh] flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-cyan-400 drop-shadow-xl"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-4 text-lg text-slate-300 max-w-2xl"
        >
          Have questions, ideas, or feedback? Let’s make your next adventure
          unforgettable — we’d love to hear from you.
        </motion.p>
      </section>

      {/* INFO CARDS */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {infoCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-900/70 backdrop-blur-xl p-8 text-center rounded-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:scale-[1.05]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">
              {card.title}
            </h3>
            <p className="text-slate-300">{card.info}</p>
          </motion.div>
        ))}
      </section>

      {/* CONTACT FORM + IMAGE */}
      <section className="relative z-10 bg-slate-950/70 backdrop-blur-2xl py-16 px-6 overflow-hidden">
        {/* World map glowing effect */}
        <motion.img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png"
          alt="World Map"
          initial={{ opacity: 0.1, scale: 1 }}
          animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT: IMAGE */}
          <motion.img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=80"
            alt="Travel Contact"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-2xl hidden md:block"
          />

          {/* RIGHT: FORM */}
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              alert("message sent!");
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/70 p-10 rounded-2xl shadow-2xl border border-cyan-500/30"
          >
            <h2 className="text-3xl font-bold text-cyan-400 mb-3 text-center">
              Send Us a Message
            </h2>
            <p className="text-slate-400 mb-8 text-center">
              Share your thoughts, ideas, or questions — we’ll respond soon!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-lg bg-slate-800/60 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-lg bg-slate-800/60 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="p-3 rounded-lg bg-slate-800/60 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none w-full mb-6"
              required
            />
            <textarea
              placeholder="Your Message"
              className="h-32 p-3 rounded-lg bg-slate-800/60 text-slate-200 focus:ring-2 focus:ring-cyan-500 outline-none resize-none w-full mb-6"
              required
            />

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px #22d3ee" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-8 rounded-lg font-semibold tracking-wide shadow-lg w-full"
            >
              Send Message 
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
