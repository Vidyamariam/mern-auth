import React from 'react'
import Header from '../components/Header'

function Home() {
  return (

    <div>
        <Header/>
         <div className='max-w-lg mx-auto'  >
         <h1 className='p-5  font-bold text-blue-800 text-3xl flex flex-col gap-4' >Welcome to Auth App!</h1>
         <p>Welcome to MERN Auth App, your go-to solution for secure and seamless authentication in MERN stack applications. Our platform is designed to provide robust user authentication and authorization capabilities, ensuring that your applications are both secure and user-friendly.  </p>

         <p> MERN Auth App is built by a dedicated team of developers and security enthusiasts with a passion for creating secure, high-performance applications. Our expertise spans across the MERN stack (MongoDB, Express.js, React.js, and Node.js), allowing us to deliver a comprehensive authentication solution tailored to the needs of modern web applications. </p>

         </div>

    </div>
    
  )
}

export default Home
