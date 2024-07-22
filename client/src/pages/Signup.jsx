import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-5' >Signup</h1>
       <form className='flex flex-col gap-4' >
             <input type='text' placeholder='Enter username'id='username' className='bg-slate-300 p-3 rounded-lg' ></input>
             <input type='email' placeholder='Enter email' id='email' className='bg-slate-300 p-3 rounded-lg' ></input>
             <input type='password' placeholder='Enter password' id='password' className='bg-slate-300 p-3 rounded-lg' ></input>
             <button className='bg-blue-900 text-cyan-50 p-3 rounded-lg uppercase hover:opacity-80'>Signup</button>
       </form>

       <div className='flex flex-row gap-1 mt-1'>
        <p>Already have an account?</p>
         <Link to={'/login'} >
         <span className='text-cyan-600 ' >Sign in</span>
         </Link>
        
       </div>
    </div>
  )
}

export default Signup
