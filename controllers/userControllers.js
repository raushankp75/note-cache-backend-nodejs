const asyncHandler = require("express-async-handler")
const User = require('../models/userModel')


const signupUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("User already exists with this email")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if(user){
        res.status(201).json({
            success:true,
            message:'Signup successfully!',
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic
        })
    } else{
        res.status(400);
        throw new Error('Error has occured')
    }

});


module.exports = { signupUser }