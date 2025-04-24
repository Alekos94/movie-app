import mongoose from 'mongoose'

export async function databaseConnection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/movie-app-db');
    console.log('Database connected successfully!')
  } catch (error) {
    console.log(error)
  }
}