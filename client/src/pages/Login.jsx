import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import {useDispatch, useSelector} from "react-redux"
import OAuth from '../components/OAuth';

function Login() {
  const [formdata, setFormData] = useState({});
   const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChanges = (e) => {

    setFormData({ ...formdata, [e.target.id]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       dispatch(signInStart());
      const res = await fetch('/backend/auth/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      // console.log(data);   
      if(data.success == false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data))
        navigate("/");
    }
    catch (error) {
     dispatch(signInFailure(error));
    }

  }


  return (
    <div className='p-4 max-w-lg mx-auto' >
      <h1 className=' text-3xl font-bold text-center my-5' >Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
      <input type='email' placeholder='Enter email' id='email' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
        <input type='password' placeholder='Enter password' id='password' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
        <button className='bg-blue-900 text-cyan-50 p-3 rounded-lg uppercase hover:opacity-80'>
         {loading ? 'Loading..': 'Login'}</button>
          <OAuth/>
      </form>
       <div className='flex flex-row gap-3 mt-2' >
         <p>Dont have an account? </p>
         <Link to={'/signup'} >
         <span className='text-blue-500' >Signup</span>
         </Link>
          
       </div>
       <span className='text-red-700 mt-3' >{error ? error.message || 'Something went wrong!' : ''}</span>
    </div>
  )
}

export default Login
