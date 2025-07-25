import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import {Link, useNavigate} from "react-router"
import toast from "react-hot-toast"
import axiosInstance from "../lib/axiosInstance.js";
const Createpage = () => {
  const[title,setTitle] =useState("");
  const[content,setContent] =useState("");
  const[loading,setLoading] =useState(false);
  
  const navigate = useNavigate();
  const handleSubmit = async (e)=> {
     e.preventDefault();

     if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
     }
     setLoading(true);
     try {
      await axiosInstance.post("/notes",{
        title,content
      });
      toast.success("notes created successfully")
      navigate("/")
     } catch (error) {
      console.log("error while creating note", error)
      toast.error("failed to create")
     }finally{
      setLoading(false)
     }
  }
  return (
    <div className="min-h-screen bg-base-200 ">
      <div className="constainer mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <FaArrowLeft className="size-5"/>
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                    <input type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) =>setTitle(e.target.value)} />
                  </label>
                </div>


                  <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                    <input type="text"
                    placeholder="Write your note here..,"
                    className="textarea textarea-bordered w-40"
                    value={content}
                    onChange={(e) =>setContent(e.target.value)} />
                  </label>
                </div>


                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Createpage
