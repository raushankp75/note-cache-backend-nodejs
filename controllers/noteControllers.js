const asyncHandler = require("express-async-handler")
const Note = require('../models/noteModel');



const getAllNotes = asyncHandler( async(req, res) => {
    const notes = await Note.find({user: req.user._id})
    res.json(notes)
})



const createNote = asyncHandler( async(req, res) =>{
    const { title, content, category } = req.body;
    
    if( (!title || !content || !category)) {
        res.status(400);
        throw new Error('Please fill all the fields');
    } else {
        const note = new Note({
            user: req.user._id, 
            title, 
            content,
            category
        });

        const createdNote = await note.save();
        
        res.status(201).json(createdNote);
    }
});




const getSingleNote = asyncHandler( async(req, res) => {
    const note = await Note.findById(req.params.id);

    if(note){
        res.json(note);
    }else{
        res.status(404).json({ message: 'Note not found' })
    }
})


module.exports = { getAllNotes, createNote, getSingleNote }