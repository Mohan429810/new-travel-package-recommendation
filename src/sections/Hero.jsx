import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="rounded-3xl overflow-hidden shadow-xl mt-6">
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-[28rem]">
        <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")] bg-cover bg-center filter brightness-75'></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start px-5 sm:px-8 md:px-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">Find your perfect getaway</h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-200 max-w-lg">
            Search curated travel packages — beach, hill, adventure, cultural, and more. 
            Enter your preferences and get tailored recommendations.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/packages" className="px-4 py-3 rounded-lg bg-indigo-500 text-white text-center hover:bg-indigo-600 transition">
              View Packages
            </Link>
            <Link to="/recommend" className="px-4 py-3 rounded-lg border border-white/30 text-white text-center hover:bg-white/10 transition">
              Get Recommendations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
