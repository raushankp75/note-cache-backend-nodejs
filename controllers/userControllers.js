const asyncHandler = require("express-async-handler")
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");


const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password, image } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists with this email")
    }

    const user = await User.create({
        name,
        email,
        password,
        image
    });

    if (user) {
        res.status(201).json({
            success: true,
            message: 'Signup successfully!',
            _id: user._id,
            name: user.name,
            email: user.email,
            password:user.password,
            isAdmin: user.isAdmin,
            image: user.image,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Error has occured')
    }

});




const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            token: generateToken(user._id),
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            
        })
    } else {
        res.status(400);
        throw new Error('Invalid email or password')
    }
});

module.exports = { signupUser, authUser }