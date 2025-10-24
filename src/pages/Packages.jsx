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
    <div className='max-w-7xl mx-auto px-4 pb-8'>
      <h1 className='text-3xl font-bold mb-4'>All Packages</h1>
      <div className='flex gap-4 items-center mb-6'>
        <select value={type} onChange={e=>setType(e.target.value)} className='px-3 py-2 rounded-md bg-primary-900 border border-primary-700'>
          {types.map(t=> <option key={t} value={t}>{t}</option>)}
        </select>
        <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder='Max budget (₹)' className='px-3 py-2 rounded-md bg-primary-900 border border-primary-700' />
      </div>
      <motion.div layout className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filtered.map((t,idx)=> <PackageCard key={idx} p={t} />)}
      </motion.div>
    </div>
  )
}
