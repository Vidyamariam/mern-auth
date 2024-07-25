import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


function Signup() {

  const [formdata, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const handleChanges = (e) => {

    setFormData({ ...formdata, [e.target.id]: e.target.value });

  }
  //console.log(formdata);

  const validateFields = () => {

     const {username, email, password} = formdata;
    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setEmailError('Invalid email format');
        isValid = false;
      } else {
        setEmailError('');
      }
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

     const isValid = validateFields();
     if(!isValid){
      return;
     } 

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/backend/auth/signup', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if(data.success == false){
        setError(true);
        return;
      }
      navigate("/login");
    }
    catch (error) {
      setLoading(false);
      setError(true);
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-5' >Signup</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input type='text' placeholder='Enter username' id='username' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
         {usernameError && <p className='text-red-700' >{usernameError}</p>}
        <input type='email' placeholder='Enter email' id='email' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
        {emailError && <p className='text-red-700' >{emailError}</p>}
        <input type='password' placeholder='Enter password' id='password' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
        {passwordError && <p className='text-red-700' >{passwordError}</p>}
        <button className='bg-blue-900 text-cyan-50 p-3 rounded-lg uppercase hover:opacity-80'>
         {loading ? 'Loading..': 'Signup'}</button>
         <OAuth/>
      </form>

      <div className='flex flex-row gap-1 mt-1'>
        <p>Already have an account?</p>
        <Link to={'/login'} >
          <span className='text-cyan-600 ' >Sign in</span>
        </Link>

      </div>
        <span className='text-red-700 mt-3' >{error && 'Something went wrong!'}</span>
    </div>
  )
}

export default Signup
