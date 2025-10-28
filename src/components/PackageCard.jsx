import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import trips from '../data/trips.json';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function PackageCard({ p }) {
  const price = p.Package_Price || p.Cost || p.Price || 0;
  const [isFav, setIsFav] = useState(false);
  const [open, setOpen] = useState(false); // modal state

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    setIsFav(favs.some(f => f.Trip_ID === p.Trip_ID));
  }, [p.Trip_ID]);

  function toggleFav() {
    const currentFavs = JSON.parse(localStorage.getItem('favourites') || '[]');
    let updatedFavs;

    if (isFav) {
      updatedFavs = currentFavs.filter(f => f.Trip_ID !== p.Trip_ID);
    } else {
      updatedFavs = [...currentFavs, p];
    }

    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
    setIsFav(!isFav);
    window.dispatchEvent(new Event('storage'));
  }

  return (
    <>
      {/* Card */}
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
            <div className="text-white font-bold">
              ₹ {Number(price).toLocaleString()}
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            {/* OPEN MODAL */}
            <button
              onClick={() => setOpen(true)}
              className="px-3 py-2 rounded-md bg-indigo-500 text-white text-sm"
            >
              View
            </button>

            <button
              onClick={toggleFav}
              className={`px-3 py-2 rounded-md text-sm transition-all ${
                isFav
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
              title={isFav ? 'Remove from Favourites' : 'Add to Favourites'}
            >
              {isFav ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        centered
        className="custom-modal"
      >
        {/* Package Details */}
        <div className="text-white bg-slate-900 rounded-xl overflow-hidden">
          <img
            src={p.image_url || ''}
            alt={p.Package_Title || p.Destination}
            className="w-full h-60 object-cover rounded-t-xl"
          />

          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">{p.Package_Title || p.Destination}</h2>
            <p className="text-slate-300 mb-3">{p.Highlight || p.Highlights}</p>

            <div className="flex justify-between items-center mb-4 text-slate-400">
              <span>{p.Duration}</span>
              <span className="text-white font-semibold text-lg">₹ {price.toLocaleString()}</span>
            </div>

            <hr className="border-slate-700 my-3" />

            {/* Reviews Section */}
            <h3 className="text-xl font-semibold mb-3">Reviews & Ratings</h3>
            <ReviewForm tripId={p.Trip_ID} />
            <ReviewList tripId={p.Trip_ID} />
          </div>
        </div>
      </Modal>
    </>
  );
}
