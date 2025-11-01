import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import trips from '../data/trips.json';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function PackageCard({ p }) {
  const price = p.Package_Price || p.Cost || p.Price || 0;
  const [isFav, setIsFav] = useState(false);
  const [open, setOpen] = useState(false); // modal state
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (loggedInUser) {
      const favs = JSON.parse(localStorage.getItem(`favourites_${loggedInUser.email}`) || '[]');
      setIsFav(favs.some(f => f.Trip_ID === p.Trip_ID));
    }
  }, [p.Trip_ID, loggedInUser]);

  function toggleFav() {
    if (!loggedInUser) {
      alert('Please login to add favourites.');
      return;
    }
    const currentFavs = JSON.parse(localStorage.getItem(`favourites_${loggedInUser.email}`) || '[]');
    let updatedFavs;

    if (isFav) {
      updatedFavs = currentFavs.filter(f => f.Trip_ID !== p.Trip_ID);
    } else {
      updatedFavs = [...currentFavs, p];
    }

    localStorage.setItem(`favourites_${loggedInUser.email}`, JSON.stringify(updatedFavs));
    setIsFav(!isFav);
    window.dispatchEvent(new Event('storage'));
  }

  return (
    <>
      {/* Card */}
      <div className="bg-gradient-to-br from-primary-800/50 to-primary-700/30 border border-primary-700 rounded-2xl overflow-hidden shadow-lg">
        <div className="h-44 md:h-56 w-full bg-slate-200 overflow-hidden">
          <img
            src={p.Image_URL || p.Image_URL }
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
              Duration : {p.Duration || p.Duration_Days || ''}  Day's
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
        width="90%"
        style={{ maxWidth: '900px' }}
        centered
        className="custom-modal"
      >
        {/* Package Details */}
        <div className="text-white bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={p.Image_URL || ''}
            alt={p.Package_Title || p.Destination}
            className="w-full h-48 md:h-64 object-cover rounded-t-xl"
          />

          <div className="p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">{p.Package_Title || p.Destination}</h2>

            {/* Key Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-semibold">Destination:</span>
                <span className="text-slate-300">{p.Destination}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-semibold">From:</span>
                <span className="text-slate-300">{p.Source}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-semibold">Type:</span>
                <span className="text-slate-300">{p.Destination_Type} - {p.Package_Type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-semibold">Category:</span>
                <span className="text-slate-300">{p.Package_Category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-semibold">Season:</span>
                <span className="text-slate-300">{p.Season}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-indigo-400 font-semibold">Rating:</span>
                <span className="text-yellow-400">{'★'.repeat(p.User_Rating || 0)}</span>
              </div>
            </div>

            <hr className="border-slate-700 my-4" />

            {/* Highlights */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Highlights</h3>
              <p className="text-slate-300 leading-relaxed">{p.Highlight || p.Highlights}</p>
            </div>

            {/* Trip Description */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Trip Description</h3>
              <p className="text-slate-300 leading-relaxed">{p.Trip_Description}</p>
            </div>

            {/* Itinerary Plan */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">Itinerary Plan</h3>
              <p className="text-slate-300 leading-relaxed whitespace-pre-line">{p.Itinerary_Plan}</p>
            </div>

            <hr className="border-slate-700 my-4" />

            {/* Duration and Price */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <div className="text-slate-400 mb-2 md:mb-0">
                <span className="font-semibold">Duration:</span> {p.Duration_Days} Day's
              </div>
              <div className="text-white font-bold text-xl md:text-2xl">
                ₹ {price.toLocaleString()}
              </div>
            </div>

            {/* User Budget */}
            <div className="text-slate-400 mb-4">
              <span className="font-semibold">Your Budget:</span> ₹ {p.User_Budget?.toLocaleString() || 'N/A'}
            </div>

            <hr className="border-slate-700 my-4" />

            {/* Reviews Section */}
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">Reviews & Ratings</h3>
            <ReviewForm tripId={p.Trip_ID} />
            <ReviewList tripId={p.Trip_ID} />
          </div>
        </div>
      </Modal>
    </>
  );
}
