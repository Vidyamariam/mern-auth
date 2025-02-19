import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
     const dispatch = useDispatch();
     const navigate = useNavigate();

    const handleGoogleClick= async ()=> {

         try{
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider); 
            const res = await fetch('/backend/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });       
             const data = await res.json();
             
             if (res.ok) {
                console.log(data);
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                console.error("Error in response:", data);
            }

         }
         catch(error){
            console.log("could not login with google", error);
         }
    }

  return (
   
       <button type='button' onClick={handleGoogleClick} className='bg-red-600 p-3 rounded-lg text-white uppercase hover:opacity-85' >Signin with Google</button>
    
  )
}
