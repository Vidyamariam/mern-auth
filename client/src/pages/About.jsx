import React from 'react'
import Header from '../components/Header'

function About() {
  return (
    <div  >
      <Header/>
        <div className='max-w-lg mx-auto mt-4 flex flex-col gap-4' >
        <h1 className='text-blue-800 text-3xl font-bold' >About Us</h1>
        <p className='mt-3' >
        
        Our mission is to simplify the process of implementing authentication in MERN stack applications, allowing developers to focus on building their core features without worrying about security vulnerabilities. We strive to provide a solution that is not only secure but also easy to integrate and customize to fit the specific requirements of your project.
        </p>
        <p>
        MERN Auth App is built by a dedicated team of developers and security enthusiasts with a passion for creating secure, high-performance applications. Our expertise spans across the MERN stack (MongoDB, Express.js, React.js, and Node.js), allowing us to deliver a comprehensive authentication solution tailored to the needs of modern web applications.

        </p>
        </div>
       
    </div>
  )
}

export default About
