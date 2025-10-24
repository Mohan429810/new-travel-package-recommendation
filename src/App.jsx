import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Recommendation from './pages/Recommendation'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import Favourites from './pages/Favourites'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className='min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 text-slate-100'>
      <Navbar />
      <main className='pt-24'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/packages' element={<Packages />} />
          <Route path='/recommend' element={<Recommendation />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/favourites' element={<Favourites/>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
