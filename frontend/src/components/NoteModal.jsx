import { useState ,useEffect} from "react";
import axios from "axios"
const NoteModal = ({onClose,onSave,editNote,onEditSave}) => {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const handleSubmit=async(e)=>{
      e.preventDefault();
       try{
        const token=localStorage.getItem("token");
        if(editNote){
            const newNote=await axios.put(`/api/notes/update/${editNote._id}`,{
                title,description
            },{
                headers:{Authorization:`Bearer ${token}`}
            })
            onEditSave(newNote.data.data)
        }
        else{
            const newNote = await axios.post(
              "/api/notes/add",
              {
                title,
                description,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
              onSave(newNote.data.data);
        }
        
      
       }
       catch(err){
        console.log("error occured",err);
       }
    }

    useEffect(()=>{
        setTitle(editNote?editNote.title:"");
        setDescription(editNote?editNote.description:"");
    },[editNote])

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 ">
      <div className="bg-gray-900 p-10 w-full max-w-md rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {editNote ? "Update Note" : "Create Note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            placeholder="Note Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            type="text"
            value={description}
            placeholder="Note Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            rows={5}
          />
          <div className="space-x-4">
            <button className="px-4 py-2 bg-gray-300 text-black font-medium rounded-md hover:bg-gray-400 cursor-pointer">
              {editNote ? "Update" : "Create"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal