const express = require('express');
const { signupUser, authUser } = require('../controllers/userControllers');
const router = express.Router()



router.route('/').post(signupUser)
router.route('/login').post(authUser)



module.exports = router;