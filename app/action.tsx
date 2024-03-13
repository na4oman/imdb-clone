'use server'
import MovieCard from '@/components/MovieCard'
import { CastProp, CrewProp, MovieProp } from './types/types'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    'Cache-Control': 'no-cache',
  },
}

// GET MOVIES
export const fetchMovies = async (type: string, page: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`,
    options
  )

  const data = await response.json()
  // console.log(data)

  return data.results.map((item: MovieProp, index: number) => (
    <MovieCard key={item.id} movie={item} index={index} />
  ))

  // return data.results
}

// GET MOVIE DETAILS
export const fetchMovieDetails = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  )

  const data = await response.json()
  // console.log(data)

  return data
}

// GET MOVIE CREDITS
export const fetchMovieCredits = async (id: number) => {
  let cast: CastProp[] = []
  let crew: CrewProp[] = []
  let stars: Array<string> = []
  let director: Array<string> = []
  let writers: Array<string> = []

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    options
  )

  const data = await response.json()
  data.cast.map((el: CastProp) => cast.push(el))
  data.crew.map((el: CrewProp) => crew.push(el))

  cast
    .filter(el => el.known_for_department === 'Acting')
    .map(el => stars.push(el.name))

  crew.filter(el => el.job === 'Director').map(el => director.push(el.name))

  crew
    .filter(
      el =>
        el.job === 'Story' ||
        el.job === 'Novel' ||
        el.job === 'Screenplay' ||
        el.job === 'Writer'
    )
    .map(el => writers.push(el.name))

  stars = stars.slice(0, 5)
  writers = [...new Set(writers)].slice(0, 3)

  return {
    director,
    stars,
    writers,
  }
}

// GET TOP RATED MOVIES
export const fetchTopRatedMovies = async (page: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    options
  )

  const data = await response.json()
  // console.log(data)

  return data.results.map((item: MovieProp, index: number) => (
    <MovieCard key={item.id} movie={item} index={index} />
  ))
}

// GET Videos by ID
export const getVideoById = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    options
  )

  const data = await response.json()
  const video = await data.results.filter(
    (video: any) => video.type === 'Trailer'
  )

  // console.log(video)
  const youtubeVideoId = video[0]?.key
  const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`

  return videoUrl
}

// GET YouTube ID
export const getYoutubeId = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos`,
    options
  )

  const data = await response.json()

  // Check if data.results is an array and has at least one element
  if (Array.isArray(data.results) && data.results.length > 0) {
    // Filter videos and check if there are any trailers
    const videos = data.results.filter((video: any) => video.type === 'Trailer')

    // Check if videos array is not empty before accessing the first element
    if (videos.length > 0) {
      const youtubeVideoId = videos[0].key
      return youtubeVideoId
    }
  }

  // Return null if no trailers found or data is invalid
  return null
}

// GET Now Playing Movies
export const nowPlaying = async (page: number) => {
  const randomNumber = Math.floor(Math.random() * 20) + 1 // Get random number 1-20
  page = Math.floor(Math.random() * 10) + 1 // Get random page number 1-10

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    options
  )

  const data = await response.json()
  // console.log(data)
  const topMovie = data.results[randomNumber] // Get random movie from the returned array
  // console.log(topMovie)
  return topMovie
}

// GET Random Movie from Now Playing Movies
export const getRandomMovie = async () => {
  const randomPage = Math.floor(Math.random() * 100) + 1
  const randomMovie = await nowPlaying(randomPage)
  // console.log(randomMovie)
  return randomMovie
}

// GET Movie Runtime
export const getMovieRuntime = async (id: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options
  )

  const data = await response.json()
  return data.runtime
}

// GET MOVIES by QUERY
export const searchMoviesByQuery = async (q: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${q}&include_adult=false&language=en-US&page=1`,
    options
  )

  const data = await response.json()
  // console.log(data)

  return data.results
}
