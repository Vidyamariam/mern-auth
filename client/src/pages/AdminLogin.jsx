import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [formdata, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChanges= (e)=> {
        
        setFormData({ ...formdata, [e.target.id]: e.target.value });
    }

    const handleSubmit= async (e)=> {

         e.preventDefault();
       try{
           const res = await fetch('/backend/admin/adminlogin', {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
          });

           const data = await res.json();
          //  console.log(data);
          navigate('/dashboard');
          
       }catch(error){
          console.log(error);
       }

    }


  return (
    <div className='max-w-lg mx-auto' >
        <h1 className='text-3xl font-bold text-center my-5' >Admin Login</h1>
         <form className='flex flex-col gap-4' onSubmit={handleSubmit} >

         <input type='email' placeholder='Enter email' id='email' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
      
        <input type='password' placeholder='Enter password' id='password' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
        
        <button className='bg-blue-900 text-cyan-50 p-3 rounded-lg uppercase hover:opacity-80'>
         Login</button>
    
         </form>
    </div>
  )
}
