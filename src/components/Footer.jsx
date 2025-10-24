import React from 'react'
export default function Footer(){ 
  return (
    <footer className='mt-12 border-t border-primary-800 bg-primary-900/60'>
      <div className='max-w-7xl mx-auto px-4 py-8 text-center text-slate-300'>
        <div className='mb-3'>© {new Date().getFullYear()} Voyage — Travel Packages</div>
        <div className='text-sm'>Built with ❤️ • Demo site using provided dataset</div>
      </div>
    </footer>
  )
}
