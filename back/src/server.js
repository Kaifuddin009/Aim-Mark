import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();
const app = express();

app.use(express.json())//this is middleware will parse json bodies: req.body
app.use(ratelimiter)
app.use(cors({
    origin:"http://localhost:5173",
}))

app.use("/api/notes",notesRoutes);

connectDB().then(() => {
app.listen(process.env.PORT || 5000, () =>{
    console.log(`server is running ${process.env.PORT}`)
})
})
 