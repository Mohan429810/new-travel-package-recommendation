import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className='max-w-4xl mx-auto px-4 py-24 text-center'>
      <h1 className='text-5xl font-bold'>404</h1>
      <p className='mt-3 text-slate-300'>Page not found</p>
      <Link to='/' className='mt-4 inline-block px-4 py-2 bg-indigo-500 rounded'>Go Home</Link>
    </div>
  )
}
