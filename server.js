import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoutes.js'

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())


try {
    const conn = await mongoose.connect('mongodb://localhost:27017/majorProjectDB')
    console.log(`MongoDB Connected: ${conn.connection.host} port ${conn.connection.port}`)
} catch (error) {   
    console.log(error)
}

app.use('/api/user', userRouter)



app.listen(5000, console.log('Server running on port 5000.'))