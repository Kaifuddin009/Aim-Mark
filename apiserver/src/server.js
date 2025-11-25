import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
//import ratelimiter from "./middleware/ratelimiter.js";
import path from "path";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

//app.use(ratelimiter);
app.use("/api/notes", notesRoutes);

// ✅ Production: serve frontend build
/*if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../front/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front", "dist", "index.html"));
  });
}
*/
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
});
