import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
//initial state
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null
}
//async thunk

export const registerUser = createAsyncThunk("auth/registerUser", async(credentials, {rejectWithValue})=>{
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, credentials, {
      headers: {
        "Content-Type": "application/json"
      }    
    })
    console.log("Register success:" , response.data);
    return response.data
    
  } catch (error) {
    console.log("Register Error", error.response?.data);
    return rejectWithValue(error.response?.data);
  }
})

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error:", error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);
    //createSlice

    const authSlice = createSlice({
        name:"auth",
        initialState,
        reducers:{
            logout: (state)=>{
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        },
        extraReducers: (builder)=>{
            builder.addCase(loginUser.pending, (state)=>{
                state.loading= true;
                state.error= null;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.loading = false;              
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error= null;
                console.log("LOGIN DATA:", action.payload);
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.loading= false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state, action)=>{
              state.loading = true,
              state.error= null;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
              state.loading= false;
              state.error= null;
            })
            .addCase(registerUser.rejected, (state, action)=>{
              state.loading = false,
              state.error = action.payload
            })
        }
    })
    export const { logout } = authSlice.actions;
    export default authSlice.reducer;