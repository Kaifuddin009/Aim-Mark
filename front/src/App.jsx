import {Routes, Route} from "react-router";
import Homepages from './pages/Homepages'
import Createpage from './pages/Createpage';
import NoteDetailed from './pages/NoteDetailed';

import {Toaster} from "react-hot-toast";
const App = () => {
  return (
    <div className="relative h-full w-full font-sans" data-theme="coffee">
      <Toaster position="top-right" />
    
    <Routes>
       <Route path="/" element={<Homepages/>}/>
       <Route path="/create" element={<Createpage/>}/>
       <Route path="/note/:id" element={<NoteDetailed/>}/>
    </Routes>
    </div>
  )
}
  
export default App
