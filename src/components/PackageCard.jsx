import React, { useState, useEffect } from 'react';
import trips from '../data/trips.json';

export default function PackageCard({ p, onClick }) {
  const price = p.Package_Price || p.Cost || p.Price || 0;

  // maintain local favourite state
  const [isFav, setIsFav] = useState(false);

  // initialize favourite state on first render
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    setIsFav(favs.some(f => f.Trip_ID === p.Trip_ID));
  }, [p.Trip_ID]);

  function toggleFav() {
    const currentFavs = JSON.parse(localStorage.getItem('favourites') || '[]');
    let updatedFavs;

    if (isFav) {
      // remove from favourites
      updatedFavs = currentFavs.filter(f => f.Trip_ID !== p.Trip_ID);
    } else {
      // add to favourites
      updatedFavs = [...currentFavs, p];
    }

    // save to localStorage
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));

    // update local state to re-render immediately
    setIsFav(!isFav);

    // notify other components (like favourites page)
    window.dispatchEvent(new Event('storage'));
  }

  return (
    <div className="bg-gradient-to-br from-primary-800/50 to-primary-700/30 border border-primary-700 rounded-2xl overflow-hidden shadow-lg">
      <div className="h-44 md:h-56 w-full bg-slate-200 overflow-hidden">
        <img
          src={p.image_url || ''}
          alt={p.Package_Title || p.Destination}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{p.Package_Title || p.Destination}</h3>
        <div className="text-sm text-slate-300 my-1">
          {p.Highlight || p.Highlights || ''}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-slate-300">
            {p.Duration || p.Duration_Days || ''}
          </div>
          <div className="text-white font-bold">₹ {Number(price).toLocaleString()}</div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onClick && onClick(p)}
            className="px-3 py-2 rounded-md bg-indigo-500 text-white text-sm"
          >
            View
          </button>
          <button className="px-3 py-2 rounded-md border border-primary-700 text-sm">
            Book
          </button>
          <button
            onClick={toggleFav} className={`px-3 py-2 rounded-md text-sm transition-all ${isFav? 'bg-indigo-500 text-white': 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}>
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}

