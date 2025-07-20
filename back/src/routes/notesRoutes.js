import express from "express";
import { creatednote, deletenote, getAllnotes, updatenote,getnotesbyId } from "../controllers/notesControllers.js";
const router = express.Router();

router.get("/", getAllnotes)
router.get("/:id", getnotesbyId)
router.post("/", creatednote)
router.patch("/:id", updatenote)
router.delete("/:id", deletenote)

export default router;