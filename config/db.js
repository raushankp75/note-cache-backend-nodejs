const mongoose = require('mongoose')
const dotenv = require('dotenv')


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            // useCreateIndex: true
        });

        console.log(`MongoDB Connected on: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;