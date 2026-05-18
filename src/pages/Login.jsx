import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import "./styles/login.css";

const Login = () => {

  

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const registerbody = {

        name: name,
        email: email,
        password: password
    }

    const loginbody = {

        email: email,
        password: password
    }

    const baseUrl = "https://trainticketbookingsystem-rbih.onrender.com/api/";
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(baseUrl + "auth/" + (isLogin ? "?isLogin=true" : ""), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(isLogin ? loginbody : registerbody)
        });

        const data = await response.json();
        const user = data.data;
        console.log(user);
        
        if(user){
        localStorage.setItem("userId", user.id);
        toast.success("login successfully")
        navigate("/");

        }else{
            toast.error("Invalid credentials");
        }
      }
        

    return (
<div className="auth-container">
  {localStorage.getItem("userId") ? navigate("/"):null}
  <div className="auth-card">
    <h2>{isLogin ? "Login" : "Register"}</h2>
        {/* {localStorage.getItem("userId") && navigate("/")} */}
    <form>
      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p
        className="switch-text"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </form>
  </div>
</div>
           
        ) 
}

export default Login