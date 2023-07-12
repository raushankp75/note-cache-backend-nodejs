const express = require('express');
const { signupUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const router = express.Router()

const { isAuthenticated } = require('../middlewares/authMiddleware');


router.route('/').post(signupUser)
router.route('/login').post(authUser)
router.route('/profile').post(isAuthenticated, updateUserProfile)



module.exports = router;