import LoadMore from '../../components/LoadMore'
import { fetchMovies } from '../action'

// https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
// https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1
// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1

async function NowPlaying() {
  let page = 1
  const movieType = 'now_playing'

  const data = await fetchMovies(movieType, page)

  return (
    <>
      <h2 className='main-header text-white font-bold'>
        Explore Now Playing Movies
      </h2>
      <section className='section'>{data}</section>
      <LoadMore type={movieType} />
    </>
  )
}

export default NowPlaying
