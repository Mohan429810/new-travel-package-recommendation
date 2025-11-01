import React, {useState, useEffect} from 'react'
import PackageCard from '../components/PackageCard'

export default function Favourites(){
  const [favs, setFavs] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  //  add favourites instantly without refreshing
  useEffect(()=>{
    if (loggedInUser) {
      const stored=JSON.parse(localStorage.getItem(`favourites_${loggedInUser.email}`) || '[]');
      setFavs(stored);
    }
  },[loggedInUser])
  // listen for changes in localstorage
  useEffect(()=>{
    function handleStorageChange(){
      if (loggedInUser) {
        const stored=JSON.parse(localStorage.getItem(`favourites_${loggedInUser.email}`) || '[]');
        setFavs(stored)
      }
    }
    window.addEventListener('storage',handleStorageChange);
    return ()=> window.removeEventListener('storage',handleStorageChange);
  },[loggedInUser])

  if (!loggedInUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-200">
        <h2 className="text-3xl font-bold text-cyan-400">Please login to view your favourites</h2>
        <p className="mt-3 text-slate-300">
          Login to see your saved favourite trips.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Your Favorites</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {favs.length===0 ? <div>No favorites yet</div> : favs.map(p=> <PackageCard key={p.Trip_ID} p={p} />)}
      </div>
    </div>
  )
}
