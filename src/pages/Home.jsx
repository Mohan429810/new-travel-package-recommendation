import React from 'react'
import Hero from '../sections/Hero'
import TopPicks from '../sections/TopPicks'

export default function Home(){
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <Hero />
      <TopPicks />
    </div>
  )
}
