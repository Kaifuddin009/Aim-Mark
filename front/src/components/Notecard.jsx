import {Link} from 'react-router'
import { FaPenSquare } from "react-icons/fa";
import { formatDate } from '../lib/utils';
import { FiTrash2 } from "react-icons/fi";
import axiosInstance from "../lib/axiosInstance.js"
import toast from "react-hot-toast";
const Notecard = ({note,setNotes}) => {
    const handleDelete = async(e,id) =>{
        e.preventDefault();
       if (!window.confirm("Are u sure want to delete this note")) return;
       try {
        await axiosInstance.delete(`/notes/${id}`)
        setNotes((prev) => prev.filter((note) => note._id !== id)); //get rid of the deleted one
        toast.success("note deleted successfully") 
        
          } catch (error) {
        console.log("deleting in error",error)
        toast.error("failed to delete note")
       }
    }
  return (
    <Link to={`/note/${note._id}`}
    className='card bg-[#120a11] hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]'
    >
        <div className='card-body'>
            <h3 className='card-title text-white'>{note.title}</h3>
            <p className='text-white line-clamp-3'>{note.content}</p>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                {formatDate(new Date(note.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                    <FaPenSquare className='size-5'/>
                    <button className='btn btn-ghost btn-xs text-error'>
                        <FiTrash2 className='size-5' onClick={(e) =>handleDelete(e,note._id)}/>
                    </button>
                </div>
            </div>
        </div>
      
    </Link>
  )
}

export default Notecard
