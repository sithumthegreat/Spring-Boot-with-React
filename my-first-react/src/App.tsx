import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Student from './components/Student'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Orders from './pages/Orders'
import CreateOrder from './pages/CreateOrder'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
function App() { //parent component
  return(
   <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>  
            <Route path="/" element= {<Home />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Settings" element={<Settings/>}/>
            <Route path="/Categories" element={<Categories/>}/>
            <Route path='/Products' element={<Products/>}/>
            <Route path='/Orders' element={<Orders/>}/>
            <Route path='/OrdersCreate' element={<CreateOrder/>}/> 
          </Route>  
          <Route path='/Login' element={<Login/>}/>

        </Routes>

    </BrowserRouter>
   </AuthProvider>
  )

}







export default App
