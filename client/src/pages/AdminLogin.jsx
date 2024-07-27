import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/adminSlice';

export default function AdminLogin() {
    const [formdata, setFormData] = useState({});
    const { error} = useSelector((state)=> state.admin);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChanges= (e)=> {
        
        setFormData({ ...formdata, [e.target.id]: e.target.value });
    }

    const validateFields = ()=> {
      const { email, password } = formdata;
      let isValid = true;
   
       if (!email || email=== '') {
         setEmailError('Email is required');
         isValid = false;
       }
        else{
         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailPattern.test(email)) {
           setEmailError('Invalid email format');
         }
         else{
            setEmailError('');
         }
   
        }
      
       if (!password) {
         setPasswordError('Password is required');
         isValid = false;
       }else{
         setPasswordError('');
       }
   
       return isValid;
   
      };

    const handleSubmit= async (e)=> {

         e.preventDefault();

         const isValid = validateFields();
         if(!isValid){
            return;
         }

       try{
          dispatch(signInStart());
           const res = await fetch('/backend/admin/adminlogin', {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
          });

           const data = await res.json();
           if(data.success == false){
              dispatch(signInFailure(data))
              return;
           }
          //  console.log(data);
          dispatch(signInSuccess(data))
          navigate('/dashboard');
          
       }catch(error){
         dispatch(signInFailure(error));
       }

    }


  return (
    <div className='max-w-lg mx-auto' >
        <h1 className='text-3xl font-bold text-center my-5' >Admin Login</h1>
         <form className='flex flex-col gap-4' onSubmit={handleSubmit} >

         <input type='email' placeholder='Enter email' id='email' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
         {emailError && <p className='text-red-700' >{emailError}</p>}
        <input type='password' placeholder='Enter password' id='password' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
        {passwordError && <p className='text-red-700' >{passwordError}</p>}
        <button className='bg-blue-900 text-cyan-50 p-3 rounded-lg uppercase hover:opacity-80'>
         Login </button>
    
         </form>
         <span className='text-red-700 mt-3' >{error ? error.message || 'Something went wrong!' : ''}</span>
    </div>
  )
}
