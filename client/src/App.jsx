import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';


function App() {
  return (
     <BrowserRouter>
       <Routes>
         <Route path='/'  element={<Home/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/login' element={<Login/>} />
         <Route element={<PrivateRoute />} >
         <Route path='/profile' element={<Profile/>} />
         </Route>
         <Route path='/about' element={<About/>} />
          <Route path='/adminlogin' element={<AdminLogin/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/create' element={<CreateUser/>} />
       </Routes>
     </BrowserRouter>
  )
}

export default App
