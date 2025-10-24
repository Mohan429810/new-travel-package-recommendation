import React, {useState, useEffect} from 'react'
import PackageCard from '../components/PackageCard'

export default function Favourites(){
  const [favs, setFavs] = useState([]);
  //  add favourites instantly without refreshing
  useEffect(()=>{
    const stored=JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavs(stored);
  },[])
  // listen for changes in localstorage
  useEffect(()=>{
    function handleStorageChange(){
      const stored=JSON.parse(localStorage.getItem('favourites') || '[]');
      setFavs(stored)
    }
    window.addEventListener('storage',handleStorageChange);
    return ()=> window.removeEventListener('storage',handleStorageChange);
  },[])
  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Favorites</h2>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {favs.length===0 ? <div>No favorites yet</div> : favs.map(p=> <PackageCard key={p.Trip_ID} p={p} />)}
      </div>
    </div>
  )
}