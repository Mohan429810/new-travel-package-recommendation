import React, {useState, useMemo} from 'react'
import trips from '../data/trips.json'
import PackageCard from '../components/PackageCard'
import { motion } from 'framer-motion'

export default function Packages(){
  const [type, setType] = useState('All')
  const [budget, setBudget] = useState('')
  const types = ['All', ...Array.from(new Set(trips.map(t=>t.Destination_Type).filter(Boolean)))]
  const filtered = useMemo(()=> trips.filter(t=> {
    if(type !== 'All' && t.Destination_Type !== type) return false
    if(budget && Number(t.Package_Price || t.Cost || 0) > Number(budget)) return false
    return true
  }), [type,budget])
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left'>All Packages</h1>
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-6'>
        <select value={type} onChange={e=>setType(e.target.value)} className='w-full sm:w-auto px-3 py-2 rounded-md bg-primary-900 border border-primary-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'>
          {types.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder='Max budget (₹)' className='w-full sm:w-auto px-3 py-2 rounded-md bg-primary-900 border border-primary-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500' />
      </div>
      <motion.div layout className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6'>
        {filtered.map((t,idx)=> <PackageCard key={idx} p={t} />)}
      </motion.div>
    </div>
  )
}

