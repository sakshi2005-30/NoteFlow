import { useState, useEffect } from "react";
import axios from "axios";
import NoteModal from "./NoteModal";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]); // always array
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const location = useLocation();

  
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again");
        setNotes([]);
        return;
      }

      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";

      const response = await axios.get("/api/notes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      const notesArray = Array.isArray(response.data) ? response.data : [];

      const filteredNotes = search
        ? notesArray.filter(
            (note) =>
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.description.toLowerCase().includes(search.toLowerCase())
          )
        : notesArray;

      setNotes(filteredNotes);
      setError("");
    } catch (err) {
      console.error("Fetch notes error:", err);
      setError("Failed to fetch notes");
      setNotes([]); 
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [location.search]);

  
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again");
        return;
      }

      await axios.delete(`/api/notes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete note");
    }
  };

 
  const openModal = () => {
    setEditNote(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditNote(null);
  };

  
  return (
    <div className="relative min-h-screen">
      {error && <p className="text-red-600 text-center mt-6">{error}</p>}

    
      <button
        onClick={openModal}
        className="fixed bottom-10 right-10 h-14 w-14 bg-gray-800 rounded-full hover:bg-gray-900 flex justify-center items-center"
      >
        <span className="text-3xl font-medium pb-1">+</span>
      </button>

   
      {isModalOpen && (
        <NoteModal
          onClose={closeModal}
          editNote={editNote}
          onSave={(newNote) => {
            setNotes((prev) => [newNote, ...prev]);
            closeModal();
          }}
          onEditSave={(updatedNote) => {
            setNotes((prev) =>
              prev.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            );
            closeModal();
          }}
        />
      )}

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(notes) &&
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-gray-800 my-8 mx-6 px-6 py-8 rounded-lg"
            >
              <h3 className="text-xl text-white font-medium">{note.title}</h3>

              <p className="text-gray-300 my-4">{note.description}</p>

              <p className="text-gray-400 text-sm">
                {new Date(note.updatedAt).toLocaleString()}
              </p>

              <div className="mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-yellow-300 rounded-lg text-black hover:bg-yellow-400"
                  onClick={() => {
                    setEditNote(note);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-red-600 rounded-lg text-black hover:bg-red-700"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
