import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {loginUser} from "../features/auth/authSlice";
import "./Auth.css"

function Login(){
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const {loading, error, token} = useSelector((state)=>state.auth);
    const [formData, setFormData]= useState({email: "", password: ""});
    
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit= async(e) =>{
        e.preventDefault();
        console.log("form Submitted")
         console.log(formData);
        const resultAction = await dispatch(loginUser(formData));
        if(loginUser.fulfilled.match(resultAction)) // same as if (resultAction.type === "auth/loginUser/fulfilled")
            {
            navigate("/");
        }
       
    }

    return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="auth-error">Invalid Credentials</p>}

      <div className="auth-link">
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  </div>
);
    
}

export default Login;