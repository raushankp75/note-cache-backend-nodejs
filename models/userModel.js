const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        pic:{
            type:String,
            required:true,
            default:"https://www.pngmart.com/files/22/User-Avatar-Profile-Download-PNG-Isolated-Image.png"
        },
    },
    
    { timestamps: true }
);



// bcrypt password before save in DB
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
})



// decrypt password and compare
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
} 



const User = mongoose.model('User', userSchema)

module.exports = User