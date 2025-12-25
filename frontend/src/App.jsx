import { useState,useEffect } from "react";
import {Routes,Route, Navigate} from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Navbar from "./components/Navbar";
import Register from "./components/Register"
const App = () => {
  const [user,setUser]=useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }
  return (
    <div className="min-h-screen bg-gray-500 text-white">
      <Navbar user={user} handleLogout={handleLogout}/>
    
      
      <Routes>
        <Route path="/login"  element={user?<Navigate to="/" />:<Login setUser={setUser}/>}/>

        <Route path="/register" element={user?<Home/>:<Register setUser={setUser}/>}/>
        <Route path="/" element={user?<Home/>:<Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App