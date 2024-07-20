import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import About from './pages/About';

function App() {
  return (
     <BrowserRouter>
       <Header/>
       <Routes>
         <Route path='/'  element={<Home/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/profile' element={<Profile/>} />
         <Route path='/about' element={<About/>} />
       </Routes>
     </BrowserRouter>
  )
}

export default App
