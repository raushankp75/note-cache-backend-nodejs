const express = require('express');
const { signupUser } = require('../controllers/userControllers');
const router = express.Router()



router.route('/').post(signupUser)



module.exports = router;