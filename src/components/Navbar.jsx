import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
  const loc = useLocation()
  const nav = [
    {to:'/', label:'Home'},
    {to:'/packages', label:'Packages'},
    {to:'/recommend', label:'Recommend'},
    {to:'/dashboard', label:'Dashboard'},
    {to:'/about', label:'About'},
    {to:'/contact', label:'Contact'},
    {to:'/favourites', label:'Favourites'}
  ]
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur bg-primary-900/60 border-b border-primary-800'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='font-bold text-xl text-white'>Voyage</Link>
        <div className='hidden md:flex gap-4 items-center'>
          {nav.map((n)=> (
            <Link key={n.to} to={n.to} className={`px-3 py-2 rounded-md ${loc.pathname===n.to ? 'bg-primary-700/60' : 'hover:bg-primary-700/30'}`}>
              {n.label}
            </Link>
          ))}
          <Link to='/login' className='ml-4 px-4 py-2 rounded-md bg-indigo-500 text-white font-medium'>Login</Link>
        </div>
        <MobileMenu />
      </div>
    </nav>
  )
}

function MobileMenu(){
  const [open, setOpen] = React.useState(false)
  return (
    <div className='md:hidden'>
      <button aria-label='menu' onClick={()=>setOpen(!open)} className='px-3 py-2 bg-primary-700/30 rounded-md'>
        ☰
      </button>
      {open && (
        <div className='absolute right-4 mt-2 bg-primary-900/95 rounded-md p-3 w-48 border border-primary-800'>
          <Link to='/' className='block py-2'>Home</Link>
          <Link to='/packages' className='block py-2'>Packages</Link>
          <Link to='/recommend' className='block py-2'>Recommend</Link>
          <Link to='/dashboard' className='block py-2'>Dashboard</Link>
          <Link to='/about' className='block py-2'>About</Link>
          <Link to='/contact' className='block py-2'>Contact</Link>
          <Link to='/favourites' className='block py-2'>Favourites</Link>
        </div>
      )}
    </div>
  )
}
