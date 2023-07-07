const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const isAuthenticated = asyncHandler(async(req, res, next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Token failed, Please login to continue.')
        }
    }


    if(!token) {
        res.status(401);
        throw new Error('No Token, Please login to continue.')
    }
})


module.exports = { isAuthenticated };