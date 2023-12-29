require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')


mongoose.set('strictQuery',false)
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)

app.use(cors()) 
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app