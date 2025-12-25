const Note =require("../models/Note")
const getAllNotes=async(req,res)=>{
    try{
        const notes=await Note.find({createdBy:req.user._id});
        res.json(notes);
    }
    catch(err){
        console.log("Get all notes error",err);
        res.status(500).json({
            message:"Server error"
        })

    }
}
//create a note
const addNotes=async(req,res)=>{
    const {title,description}=req.body;
    try{
        if(!title ||!description){
            return res.status(400).json({
                message:"Please Enter all the required fields"
            })
        }
        const newNote=await Note.create({
            title,
            description,
            createdBy:req.user._id
        })

        return res.status(201).json({
            message:"Note created successfully",
            data:newNote
        })
    }
    catch(err){
        console.log("error in adding note",err)
        res.status(500).json({
          message: "Server error",
        });
    }
}
//get single note
const getSingleNote=async(req,res)=>{
    const noteId=req.params.id;
    try{
        if(!noteId){
            return res.status(400).json({
                message:"Note not present Id is wrong"
            })
           
        }
         const note = await Note.findById(noteId);
         res.status(201).json({
            message:"Note found",
            data:note
         })
    }
    catch(err){
        console.log("Error:",err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

//update a note
const updateNote=async(req,res)=>{
    try{
        const noteId=req.params.id;
        const note = await Note.findOneAndUpdate(
          { _id: noteId, createdBy: req.user._id },
          req.body,
          { new: true }
        );

        if(!note){
            return res.status(400).json({
                message:"Note not present"
            })
        }
        res.status(201).json({
            message:"Note found and updated",
            data:note
        })
    }
    catch(err){
        console.log("Error:",err);
        return res.status(500).json({
            message:"Server error"
        })

    }
}

//delete a note
const deleteNote=async(req,res)=>{
    try{
        const note = await Note.findOneAndDelete({
          _id: req.params.id,
          createdBy: req.user._id,
        });
        if(!note){
            return res.status(400).json({
                message:"Note not found"
            })
        }
        res.status(201).json({
            message:"Note found and deleted",
            data:note
        })
    }   
    catch(err){
        console.log("Error:",err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}
module.exports={getAllNotes,addNotes,getSingleNote,updateNote,deleteNote}