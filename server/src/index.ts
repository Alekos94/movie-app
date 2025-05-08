import express from 'express';
import cors from 'cors'
import { databaseConnection } from './config/database';
import { movieRouter } from './routes/movie.routes';
import { userRouter } from './routes/user.routes';
import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv'
// dotenv.config()

const app = express()
const port = 3000

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.2.5:5173'],
  credentials: true}))
app.use(express.json())
app.use(cookieParser())

databaseConnection()

app.use('/api/movies', movieRouter)
app.use('/api/users', userRouter)

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})