
import { Link } from 'react-router'
import { LuNotebookPen } from "react-icons/lu";
const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
        <div className='bg-primary/10 rounded-full p-8'>
        <LuNotebookPen className='size-10 text-primary'/>
        </div>
      <h3 className='text-2xl font-bold'>No Notes Yet</h3>
      <p className='text-base-content/70'>
      Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link to="/create" className='btn btn-primary'>Create U'r First Note</Link>
    </div>
  )
}

export default NotesNotFound
