import mongoose from "mongoose";

const movieSchema = new mongoose.Schema ({
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
  poster_path: {
    type: String,
    required: true
  }
}, {_id: false})

const listSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  movies: {
    type: [movieSchema],
    default: []
  }
}, {_id: false})

const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteMovies: {
    type: [movieSchema],
    default: []
  },
  watchList: {
    type: [movieSchema],
    default: []
  },
  lists: {
    type: [listSchema],
    default: []
  }
})

export const Users = mongoose.model('Users', userSchema)

