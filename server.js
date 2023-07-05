const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')


const notes = require('./data/notes')



const app = express()
dotenv.config()
connectDB();


// MIDDLEWARE
app.use(cors())



app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get('/api/notes', (req, res) => {
    res.send(notes)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running on port PORT ${PORT}`))