import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import "./Auth.css"

function Register(){
    const [formData, setformData] = useState({name:"", email:"", password: ""});
    const {loading, error} = useSelector ((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("Register Data", formData);
        const resultAction = await dispatch(registerUser(formData));
        if(registerUser.fulfilled.match(resultAction)){
            alert("User registered successfully");
            navigate("/login");
        }
        
    }
  

   const handleChange = (e)=>{
   const {name, value}= e.target;
   setformData((prev)=>({
    ...prev,
    [name]: value
   }))
   }
return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {error && <p className="auth-error">User already exists</p>}

      <div className="auth-link">
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  </div>
);

}

export default Register