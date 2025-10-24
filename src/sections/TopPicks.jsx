import React, {useMemo} from 'react'
import trips from '../data/trips.json'
import PackageCard from '../components/PackageCard'

export default function TopPicks(){
  const top = useMemo(()=> {
    const arr = trips.slice().sort((a,b)=> (b.User_Rating||0) - (a.User_Rating||0))
    return arr.slice(0,6)
  },[])
  return (
    <section className='mt-8'>
      <h2 className='text-2xl font-semibold mb-4'>Top Picks</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {top.map((t,idx)=> <PackageCard key={idx} p={t} />)}
      </div>
    </section>
  )
}
