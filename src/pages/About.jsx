import React, { useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import team1 from "../assets/team1.jpeg";
import team2 from "../assets/team2.jpeg";
import team3 from "../assets/team3.jpeg";
import team4 from "../assets/team4.jpeg";
import team5 from "../assets/team5.jpeg";

const travelImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://i.insider.com/659d6f72ec62ab5daf81e960?width=1200&format=jpeg",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  "https://static.toiimg.com/img/116693921/Master.jpg",
  "https://karnatakatourism.org/wp-content/uploads/2021/01/karnataka-unexplore.jpg",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
];

const features = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    title: "Smart Recommendations",
    desc: "Our intelligent algorithm learns from your preferences — suggesting perfect destinations whether you love beaches, hills, or cultural experiences.",
  },
  {
    image: "https://www.shutterstock.com/image-photo/tour-packages-concept-collage-travel-260nw-641820484.jpg",
    title: "Curated Travel Packages",
    desc: "We design trip plans with hand-picked stays, authentic local cuisines, and exciting experiences optimized for comfort, affordability, and adventure.",
  },
  {
    image: "https://images.emtcontent.com/holiday-img/home-img/testimonialsbanner-mb.png",
    title: "Responsive Experience",
    desc: "Enjoy a smooth interface that adapts to any device. Our dynamic design ensures seamless browsing for travelers on the go.",
  },
  {
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80",
    title: "Authentic Reviews",
    desc: "Discover honest reviews and ratings from real travelers who’ve been there before — so you can plan confidently.",
  },
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    title: "Affordable Deals",
    desc: "From luxury getaways to budget escapes — Voyage finds the most competitive prices to ensure unbeatable value.",
  },
  {
    image: "https://images.moneycontrol.com/static-mcnews/2025/03/20250325085230_15.jpg?impolicy=website&width=770&height=431",
    title: "Global Destinations",
    desc: "Explore over 100+ destinations — from snow-capped mountains to tropical islands. Voyage connects you with experiences everywhere.",
  },
  {
    image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=800&q=80",
    title: "24/7 Travel Support",
    desc: "Our support team ensures you’re never alone while traveling. Whether it’s booking help or itinerary changes — we’re here for you.",
  },
  {
    image: "https://images.unsplash.com/photo-1499696786230-29e4d99f7e24?auto=format&fit=crop&w=800&q=80",
    title: "Adventure Activities",
    desc: "Fuel your adrenaline with paragliding, scuba diving, safaris, and desert camping. Adventure awaits with Voyage.",
  },
];

const teamMembers = [
  {
    name: "Tamma Varun Sai Venkat",
    role: "Founder & CEO",
    img: team1,
    bio: "Aarav built Voyage with a passion for travel and technology. He ensures the platform delivers innovative experiences for every traveler.",
  },
  {
    name: "Mohan Tippa",
    role: "Lead Travel Designer",
    img: team2,
    bio: "Mohan crafts unique travel itineraries and ensures every destination we feature offers authentic cultural experiences.",
  },
  {
    name: "Vamsi Kumar",
    role: "Frontend Developer",
    img: team3,
    bio: "Rohan ensures the Voyage interface is fast, intuitive, and visually stunning across all devices using React and Tailwind CSS.",
  },
  {
    name: "Veresi Muneendra",
    role: "Customer Experience Manager",
    img: team4,
    bio: "Diya brings a personal touch to every journey. She ensures every traveler feels valued, supported, and heard.",
  },
  {
    name: "Rajitha.P",
    role: "Customer Experience Manager",
    img: team5,
    bio: "Rajitha brings a personal touch to every journey. She ensures every traveler feels valued, supported, and heard.",
  },
];

export default function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const controls = useAnimation();

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

  return (
    <div className="text-slate-200 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.img
          style={{ y }}
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"
          alt="Hero Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 drop-shadow-lg">
            Discover the World with Voyage
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Your journey begins here — personalized travel recommendations, stunning destinations, and unforgettable experiences.
          </p>
        </motion.div>
      </section>

      {/* INFINITE SCROLL IMAGE STRIP */}
      <section className="overflow-hidden py-12 bg-gradient-to-b from-slate-900 to-slate-800">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...travelImages, ...travelImages].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Travel ${i}`}
              className="w-[350px] h-[220px] object-cover rounded-xl shadow-lg"
            />
          ))}
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"
            alt="Explore the world"
            className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Voyage</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            <span className="text-cyan-400 font-semibold">Voyage</span> is your modern travel companion, designed to make trip planning easy, smart, and inspiring.
          </p>
          <p className="text-slate-300 leading-relaxed mb-4">
            Our mission is to connect travelers with authentic, local experiences — from serene beaches to snow-capped peaks — using intelligent recommendations and seamless design.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Built with React, Tailwind CSS, and Framer Motion, Voyage combines cutting-edge web technology with a love for adventure.
          </p>
        </motion.div>
      </section>

      {/* SCROLLING FEATURE CARDS */}
      <section className="bg-slate-900 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Why Travelers Love Voyage</h2>
        <div className="relative overflow-hidden">
          <motion.div className="flex gap-8" animate={controls}>
            {[...features, ...features].map((card, i) => (
              <div
                key={i}
                className="min-w-[300px] bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-transform hover:scale-[1.03]"
              >
                <img src={card.image} alt={card.title} className="w-full h-[180px] object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-slate-950 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-12">Meet Our Team</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-cyan-500/30 transition-transform hover:scale-[1.05]"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-3 border-2 border-cyan-400"
              />
              <h3 className="text-xl font-semibold text-white">{member.name}</h3>
              <p className="text-cyan-400 text-sm mb-2">{member.role}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}