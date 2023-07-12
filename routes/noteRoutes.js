const express = require('express');
const router = express.Router()

// import controllers
const { getAllNotes, createNote, getSingleNote, updateNote, deleteNote } = require('../controllers/noteControllers');

// import middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware');


router.route('/').get(isAuthenticated, getAllNotes)
router.route('/create').post(isAuthenticated, createNote)
router.route('/:id').get(getSingleNote)
    .put(isAuthenticated, updateNote)
    .delete(isAuthenticated, deleteNote)





module.exports = router;