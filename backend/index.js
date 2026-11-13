const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const cookieParser=require("cookie-parser")
const {InitalDatabase}=require("./src/config/db")
const authRoutes=require("./src/routes/authRoutes")
const taskRoutes=require("./src/routes/taskRoutes")
const cors = require("cors");
const app=express()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/task",taskRoutes)
const StartServer=()=>{
    InitalDatabase((err)=>{
        if(err){
            console.log(err);
            
        }
    })
    app.listen(3000,()=>{
        console.log("servre is running on port 3000");
        
    })
}
StartServer()