import Navbar from "../components/Navbar"
import Notecard from "../components/Notecard";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import NotesNotFound from "../components/NotesNotFound";
const Homepages = () => {

const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes");
      console.log(res.data);
      setNotes(res.data)
    } catch (error) {
      console.log("Error fetching notes",error)
    }finally{
      setLoading(false);
    }
  }
  fetchNotes()
},[])

  return (
    <div className="mih-h-screen">
      <Navbar/>
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && <NotesNotFound/>}
        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Notecard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepages
