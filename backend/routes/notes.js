const express=require("express");
const router=express.Router();
const protect =require("../middleware/auth")
const {getAllNotes,addNotes,getSingleNote,updateNote,deleteNote}=require("../controllers/notes-controllers")
//get all notes
router.get("/",protect,getAllNotes);
// add notes
 router.post("/add",protect,addNotes)
 //get single note
 router.get("/getnote/:id",protect,getSingleNote)

 //update note
 router.put("/update/:id", protect, updateNote);

 //delete note
 router.delete("/delete/:id", protect, deleteNote);
module.exports=router;
