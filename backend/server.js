//imports

const express = require("express");
const cors= require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
require("dotenv").config();



//create app
const app = express();

//connect DB
connectDB();
//authroutes imports


//add middleware
app.use(cors());
app.use(express.json());

//test routes
app.get("/", (req, res)=>{
    res.send("Frozen backend is working");
})
app.get("/api/protected", protect, (req,res)=>{
        res.json({message: "Protected route accessed", user: req.user});
})

//add authroutes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on PORT, ${PORT}`);
})

