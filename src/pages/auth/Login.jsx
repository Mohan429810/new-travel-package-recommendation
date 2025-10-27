import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const nav = useNavigate()
  function handle(e){
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('voyage_accounts') || '[]')
    const found = users.find(u=>u.email === email && u.password === pass)
    if(found){
      localStorage.setItem('voyage_user', JSON.stringify({name: found.name, email: found.email}))
      nav('/dashboard')
    } else {
      alert('Invalid credentials. You can register first.')
    }
  }
  return (
    <div className='max-w-md mx-auto px-4 py-12'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <form onSubmit={handle} className='grid gap-3'>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} className='px-3 py-2 rounded-md bg-primary-900/30' />
        <input placeholder='Password' value={pass} onChange={e=>setPass(e.target.value)} type='password' className='px-3 py-2 rounded-md bg-primary-900/30' />
        <button className='px-4 py-2 rounded-md bg-indigo-500 text-white' type='submit'>Login</button>
      </form>
    </div>
  )
}
