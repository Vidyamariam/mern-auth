import React, { useRef, useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader'
import {useNavigate} from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

export default function CreateUser() {
   const [formdata, setFormData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageError, setImageError] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profilePicError, setProfilePicError] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
      setImagePreview(URL.createObjectURL(image)); 
    }
  }, [image]);

  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.error(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({ ...prevFormData, profilePicture: downloadURL }));
        });
      }
    );
  };
 
    const handleChanges= (e)=> {
        setFormData({ ...formdata, [e.target.id]: e.target.value });

    }

    const validateFields = () => {

      const {username, email, password, profilePicture} = formdata;
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
      
     if(!profilePicture){
       setProfilePicError('Profile picture is required');
       isValif = false;
     }else {
      setProfilePicError('');
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
         
            const res = await fetch('/backend/admin/create', {

              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formdata),
            });
             const data = res.json();
             console.log(data);
             
             if(data.success == false){
               return;
             }

           navigate('/dashboard');
         }catch(error){
           console.log(error);
         }     
         
    }

  return (
    <div>
        <AdminHeader/>
        <div className='max-w-lg mx-auto' >
        <h1 className='text-3xl text-center font-semibold my-5' >Create User</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} /> 
        <img src={imagePreview} alt="profile" className="w-24 h-24 rounded-full self-center cursor-pointer object-cover mt-2 " onClick={()=> fileRef.current.click()} />
        {profilePicError && <p className='text-red-700 self-center' >{profilePicError}</p> }
      <input type='text' placeholder='Enter username' id='username' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges} ></input>
      {usernameError && <p className='text-red-700' >{usernameError}</p>}
       <input type='email' placeholder='Enter email' id='email' className='bg-slate-300 p-3 rounded-lg' onChange={handleChanges}></input>
       {emailError && <p className='text-red-700' >{emailError}</p>}
       <input type='password' placeholder='Enter password' id='password' className='bg-slate-300 p-3 rounded-lg'onChange={handleChanges} ></input>
       {passwordError && <p className='text-red-700' >{passwordError}</p>}
       <button className='bg-blue-900 text-cyan-50 p-3 rounded-lg uppercase hover:opacity-80'> Submit
       </button>
         
      </form>
  
        </div>
    

    </div>
  )
}
