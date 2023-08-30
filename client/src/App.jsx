import { useState, useEffect } from 'react'
import Users from './views/users/Users.jsx'
import User from './views/users/User.jsx'
import Navbar from './views/navbar/Navbar.jsx'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Register from './views/users/Register.jsx'
import Login from './views/users/Login.jsx'
import RequireAuth from './components/RequireAuth'
import Home from './views/Home.jsx'
import Task from './views/tasks/Task.jsx'

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if(token){
      const currentTime = Math.floor(Date.now() / 1000);
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      console.log(exp)
      if(currentTime > exp){
        localStorage.removeItem('jwtToken')
        navigate('/login')
      }

    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<RequireAuth allowedRoles={['Administrator']}/>}>
          <Route exact path="/users" element={<Users />} />
          <Route path="/users/:uuid" element={<User />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}/>
        <Route path="/task" element={<Task />}/>
      </Routes>
    </>
  )
}

export default App
