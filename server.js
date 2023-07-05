const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')


const notes = require('./data/notes')


// IMPORT MIDDLEWARE
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')



// IMPORT ROUTES
const userRoutes = require('./routes/userRoutes')



const app = express()
dotenv.config()
connectDB();
app.use(express.json())


// MIDDLEWARE
app.use(cors())



app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get('/api/notes', (req, res) => {
    res.send(notes)
})



// MIDDLEWARE ROUTES
app.use('/api/users', userRoutes)



// ERROR HANDLER MIDDLEWARE FROM MIDDLEWARE FOLDER import
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running on port PORT ${PORT}`))