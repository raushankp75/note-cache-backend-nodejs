const express = require('express')
const dotenv = require('dotenv')



const app = express()
dotenv.config()



app.get('/', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running on port PORT ${PORT}`))