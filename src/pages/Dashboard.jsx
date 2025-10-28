import React from 'react'

function useAuth(){
  const raw = localStorage.getItem('voyage_user')
  return raw ? JSON.parse(raw) : null
}

export default function Dashboard(){
  const user = useAuth()
  if(!user){
    return (
      <div className='max-w-4xl mx-auto px-4 py-12 text-center'>
        <h2 className='text-2xl font-bold'>You are not logged in</h2>
        <p className='mt-3'>Please login to access your dashboard.</p>
      </div>
    )
  }
  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold'>Welcome back, {user.name}</h1>
      <p className='mt-3 text-slate-300'>This dashboard shows your saved recommendations.</p>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='p-6 bg-primary-900/40 rounded-xl border border-primary-800'>
          <h3 className='font-semibold'>Saved Preferences</h3>
          <pre className='text-xs mt-2 bg-primary-900/30 p-3 rounded'>{JSON.stringify(user.preferences || {}, null, 2)}</pre>
        </div>
        <div className='p-6 bg-primary-900/40 rounded-xl border border-primary-800'>
          <h3 className='font-semibold'>Recent Matches</h3>
          <p className='text-sm mt-2 text-slate-300'>No recent matches in demo.</p>
        </div>
      </div>
    </div>
  )
}
