import Hero from '@/components/Hero'
import LoadMore from '../components/LoadMore'
import { fetchMovies } from './action'

// https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1
// https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1
// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
// https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1

async function Home() {
  let page = 1
  const movieType = 'upcoming'

  const data = await fetchMovies(movieType, page)

  return (
    <>
      <Hero />
      <h2 className='main-header md:text-3xl text-center md:text-start  text-white font-bold'>
        Explore Upcoming Movies
      </h2>
      <section className='section'>{data}</section>
      <LoadMore type={movieType} />
    </>
  )
}

export default Home
