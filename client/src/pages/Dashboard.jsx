import React from 'react'

import AdminHeader from '../components/AdminHeader'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=> {

        const fetchUsers = async ()=> {
             
            try{
                const response = await fetch('/backend/admin/users');
                const data = await response.json();
                console.log(data);
                setUsers(data);

            }catch(error){
                console.log(error);
            }
        };
         fetchUsers();
    }, []);



  return (
    <div>
        <AdminHeader/>
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <button className='bg-blue-800 text-white p-3 max-w-40 rounded-lg' onClick={()=> navigate('/create')} >Create</button>
        <table className="min-w-full bg-white">
          <thead>
             
            <tr>
              <th className="py-2">Username</th>
              <th className="py-2">Image</th>
              <th className="py-2">Email</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
               {
                     users.map((user)=> (       
              <tr key={user._id} >
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                  <img src={user.profilePicture} alt={user.username} className="w-10 h-10 rounded-full" />
                </td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </td>
              </tr>
             )) }
          </tbody>
        </table>
      </div>
    </div>
  )
}
