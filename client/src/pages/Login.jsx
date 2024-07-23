import React from 'react'

function Login() {
  return (
    <div className='p-4 max-w-lg mx-auto' >
      <h1 className=' text-3xl font-bold text-center my-5' >Login</h1>
      <form className='flex flex-col gap-4' >
         <input className='bg-slate-300 p-3 rounded-lg' type='email' placeholder='enter you email' />

         <input className='bg-slate-300 p-3 rounded-lg' type='password' placeholder='enter your password' />

         <button className='bg-blue-700 text-blue-50 p-2 rounded-lg uppercase hover:opacity-65 ' >Login</button>
      </form>
       <div className='flex flex-row gap-3 mt-2' >
         <p>Don't have an account? </p>
          <span className='text-blue-500' >Signup</span>
       </div>
    </div>
  )
}

export default Login
