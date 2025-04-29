import express from 'express';
import cors from 'cors'
import { databaseConnection } from './config/database';
import { movieRouter } from './routes/movie.routes';
import { userRouter } from './routes/user.routes';
// import dotenv from 'dotenv'
// dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
databaseConnection()
app.use('/api/movies', movieRouter)
app.use('/api/users', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})