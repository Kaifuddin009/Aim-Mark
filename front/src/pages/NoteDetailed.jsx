import { useState,useEffect } from "react";
import {useNavigate, useParams} from "react-router";
import axiosInstance from "../lib/axiosInstance.js";
import toast from "react-hot-toast";
import { FiLoader } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router";
const NoteDetailed = () => {
  const[note, setNote] = useState(null);
  const[loading, setLoading] = useState(true);
  const[saving,setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() =>{
    const fetchNote = async() => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        toast.error("Failed to fetch the note")
        console.log("error in fetching note",error)
      }finally{
        setLoading(false);
      }
    };
    fetchNote();
  },[id])

  
const handleDelete= async()=>{
if (!window.confirm("Are U sure want to detele this note?")) return;
try {
  
     await axiosInstance.get(`/notes/${id}`)
     toast.success("Note deleted")
     navigate("/")
} catch (error) {
  console.log("Error while Deleting a note",error)
  toast.error("Failed to delete note")
}
};

const handleSave= async()=>{
  if (!note.title.trim() || !note.content.trim()  ) {
    toast.error("Please add a title or content")
    return;    
  }

  setSaving(true)
try {
  await axiosInstance.patch(`/notes/${id}`,note)
  toast.success("Note updated successfully")
  navigate("/")
} catch (error) {
  console.log("Error saving the note",error)
  toast.error("Failed to update note ")
  
}finally{
  setSaving(false)
}
}

  if (loading) {
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <FiLoader className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 ">
          <Link to="/" className="btn btn-ghost">
           <HiArrowLeft className="h-5 w-5"/>
           Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <FaRegTrashAlt className="h-5 w-5"/>
            Delete Note
          </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">

            <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                    </label>
                    <input 
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>setNote({...note,title:e.target.value})} />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                    </label>
                    <textarea 
                    
                    placeholder="Write your note here..,"
                    className="textarea textarea-bordered w-40"
                    value={note.content}
                    onChange={(e) =>setNote({...note,content:e.target.value})}
                    />
                </div>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving":"Save Changes"}
                  </button>
                </div>

          </div>
        </div>

        </div>
      </div>
      
    </div>
  )
}

export default NoteDetailed
