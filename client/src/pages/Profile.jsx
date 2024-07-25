import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { signOut } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  //  console.log(imagePercent);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = (image) => {

    // console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image); //
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));

      },

      (error) => {
        setImageError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downnloadURL) => {
            setFormData({ ...formData, profilePicture: downnloadURL });
          })
      }

    );

  }

  const handleLogout = async () => {

    try {
      await fetch('/backend/auth/logout');
      dispatch(signOut());
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3" >
      <h1 className='text-3xl font-semibold text-center my-7' >Profile</h1>
      <form className="flex flex-col justify-center gap-4" >
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <img src={currentUser.profilePicture} alt="profile" className="w-24 h-24 rounded-full self-center cursor-pointer object-cover mt-2 " onClick={() => fileRef.current.click()} />
        <p className="text-sm self-center" >
          {
            imageError ? (
              <span className="text-red-700">Error uploading image</span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">Image uploaded successfully</span>
            ) : ''
          }

        </p>

        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-200 p-2 rounded-lg" />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-200 p-2 rounded-lg" />
        <input type="password" id="password" placeholder="Password" className="bg-slate-200 p-2 rounded-lg" />
        <button className="bg-blue-800 p-3 text-white uppercase rounded-lg hover:opacity-80" >Update</button>
      </form>
      <div className="flex justify-between mt-3 " >
        <span className="text-red-700 cursor-pointer" >Delete Account</span>
        <span onClick={handleLogout} className="text-red-700 cursor-pointer" >Logout</span>
      </div>
    </div>
  )
}

export default Profile
