import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()
  function handle(e){
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('voyage_accounts') || '[]')
    users.push({name, email, password, preferences: {}})
    localStorage.setItem('voyage_accounts', JSON.stringify(users))
    alert('Registered (demo). Now login.')
    nav('/login')
  }
  return (
    <div className='max-w-md mx-auto px-4 py-12'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <form onSubmit={handle} className='grid gap-3'>
        <input placeholder='Full name' value={name} onChange={e=>setName(e.target.value)} className='px-3 py-2 rounded-md bg-primary-900/30' />
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} className='px-3 py-2 rounded-md bg-primary-900/30' />
        <input placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} type='password' className='px-3 py-2 rounded-md bg-primary-900/30' />
        <button className='px-4 py-2 rounded-md bg-indigo-500 text-white' type='submit'>Register</button>
      </form>
    </div>
  )
}
