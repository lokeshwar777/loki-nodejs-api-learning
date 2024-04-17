import userRouter from './routes/userRoutes.js'
import connectDB from './config/database.js'
import errorHandler from './middleware/errorHandling.js'
import logReqRes from './middleware/loggingMiddleware.js'
import express from 'express'

const PORT = 8000
const app = express()

//Connection
connectDB('mongodb://127.0.0.1:27017/userData')

// Middleware Plugin
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('log.txt'))
app.use(errorHandler)
// app.use(express.json()) //Middleware to parse JSON data

// Routes
app.use('/users', userRouter)

app.listen(PORT, () => console.log('Its play time!'))
