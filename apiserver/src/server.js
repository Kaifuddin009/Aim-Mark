import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import ratelimiter from "./middleware/ratelimiter.js";
import path from "path";
dotenv.config();
const app = express();
const __dirname = path.resolve();


app.use(express.json())//this is middleware will parse json bodies: req.body
app.use(ratelimiter)

if (process.env.NODE_ENV !== "production") {
    
app.use(cors({
    origin:"http://localhost:5173",
}))
    
}

app.use("/api/notes",notesRoutes);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../front/dist")));

    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname,"../front","dist","index.html"))
    })
    
}

connectDB().then(() => {
app.listen(process.env.PORT || 5000, () =>{
    console.log(`server is running ${process.env.PORT}`)
})
})
 