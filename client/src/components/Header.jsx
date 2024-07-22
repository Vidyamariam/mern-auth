import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='bg-cyan-600 text-teal-50' > 
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
       <Link to='/' >
       <h1 className='font-bold' >Auth App</h1>
       </Link>
      
       <ul className='flex gap-4' >
           <Link to={'/'} >
           <li>Home</li>
           </Link>

           <Link to={'/login'} >
           <li>Login</li>
           </Link>

           
           <Link to={'/about'} >
           <li>About</li>
           </Link>
            
       </ul>
      </div>
    </div>
  )
}

export default Header
