const express = require('express');
const router = express.Router()

// import controllers
const { getAllNotes, createNote, getSingleNote } = require('../controllers/noteControllers');

// import middlewares
const { isAuthenticated } = require('../middlewares/authMiddleware');


router.route('/').get(isAuthenticated, getAllNotes)
router.route('/create').post(isAuthenticated, createNote)
router.route('/:id').get(isAuthenticated, getSingleNote)
// .put().delete()




module.exports = router;