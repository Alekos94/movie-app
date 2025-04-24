import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  tmdb_id: {
    type: Number,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  genre_ids: [{ type: Number, required: true }],
  release_date: {
    type: String,
    required: true,
  },
  user_average: {
    type: Number,
    default: null,
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

const Watchlist = mongoose.model('Watchlist', movieSchema)
const Favorites = mongoose.model('Favorites', movieSchema)

export {Watchlist, Favorites}


