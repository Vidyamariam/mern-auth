import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Header() {
  const { currentUser } = useSelector(state => state.user);

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

          
          <Link to={'/about'} >
            <li>About</li>
          </Link>


          <Link to={'/profile'} >
            {currentUser ? (
              <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
            ): (
              <li>Login</li>
              )}
           
          </Link>

        </ul>
      </div>
    </div>
  )
}

export default Header
