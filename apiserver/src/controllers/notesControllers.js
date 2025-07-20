 import {Note} from "../models/note.model.js";
 const getAllnotes = async function (req,res){
    try {
        const notes = await Note.find().sort({created:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"Internal server error"});
    }

}

const getnotesbyId = async function(req,res){
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).json({message:"this specificID note not found"})
        }
        res.status(200).json(note)
    } catch (error) {
        
        console.error("Error in getNotes controller",error);
        res.status(500).json({message:"Internal server error while fetching note"});
    }
}

const creatednote = async function(req,res){
    try {
        const {title, content} = req.body;
        const note = new Note({title, content})
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error while create note",error)
        res.status(500).json({message:"Internal server error while creating note"})
    }
}


const updatenote = async function(req,res){
    try {
        const {title,content} = req.body;
        const updated = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if (!updated) {
            return res.status(400).json({message:"note not found"})
        }
        res.status(200).json(updated)
        
    } catch (error) {
        console.error("Error while create note",error)
        res.status(500).json({message:"Internal server error while updating note"})
    }
     
    
}


const deletenote = async function(req,res){
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(404).json({message:"note not found"})
        }
        res.status(200).json({message:"note deleted successfully"})
    } catch (error) {
        console.error("Error while create note",error)
        res.status(500).json({message:"Internal server error while deleting note"})
    }
}

export{getAllnotes,
    getnotesbyId,
    creatednote,
    updatenote,
    deletenote
}