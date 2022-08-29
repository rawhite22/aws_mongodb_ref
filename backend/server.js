require('dotenv').config()
const { errorHandler } = require('./middleware/error_middleware')
const express = require('express')
const port = process.env.PORT || 5000
const connectDB = require('./db')
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/images', require('./routes/images_routes'))
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))
