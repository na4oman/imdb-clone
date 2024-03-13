import Image from 'next/image'
import { MotionDiv } from './MotionDiv'
import { fetchMovieCredits, getMovieRuntime, getYoutubeId } from '@/app/action'
import { genres } from '@/app/constants'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import YoutubePlayer from './YoutubePlayer'
import { MovieProp } from '@/app/types/types'
// import ReactPlayer from 'react-player'

interface Prop {
  movie: MovieProp
  index: number
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

async function MovieCard({ movie, index }: Prop) {
  // const videoUrl = await getVideoById(movie.id)
  const youtubeId = await getYoutubeId(movie.id)
  const credits = await fetchMovieCredits(movie.id)
  const runtime = await getMovieRuntime(movie.id)
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60

  // console.log(credits)

  const genreTitles = movie.genre_ids
    .map(id => {
      const matchedGenres = genres.find(obj => obj.id === id)
      return matchedGenres ? matchedGenres.name : null
    })
    .filter(name => name !== null)

  // console.log(movie)

  return (
    <MotionDiv
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{
        delay: index * 0.25,
        ease: 'easeInOut',
        duration: 0.5,
      }}
      className='w-[200px] rounded relative shadow hover:shadow-md shadow-slate-400 hover:shadow-slate-400'
    >
      <Dialog>
        <DialogTrigger>
          <div className='relative w-[200px] h-[275px]'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className='rounded-xs cursor-pointer'
            />
          </div>
          <div className='py-4 px-2 flex flex-col gap-3 cursor-pointer'>
            <div className='flex flex-col justify-between items-center gap-1'>
              <h2 className='font-bold text-slate-800 dark:text-slate-200 text-lg line-clamp-1 w-full text-center'>
                {movie.title}
              </h2>
              <div className='py-1 px-2 rounded-sm bg-slate-800'>
                <p className='text-sm font-bold capitalize text-[#FFAD49]'>
                  {movie.release_date}
                </p>
              </div>
            </div>
            <div className='flex gap-4 items-center justify-between'>
              <div className='flex flex-row gap-2 items-center'>
                <Image
                  src='./star.svg'
                  alt='star'
                  width={18}
                  height={18}
                  className='object-contain'
                />
                <p className='text-base font-bold text-[#FFAD49]'>
                  {movie.vote_average.toFixed(1)}
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    /10
                  </span>
                </p>
              </div>

              <div className='flex flex-row gap-2 items-center'>
                <Image
                  src='./like.svg'
                  alt='episodes'
                  width={18}
                  height={18}
                  className='object-contain'
                />
                <p className='text-base text-gray-500 dark:text-gray-400 font-bold'>
                  {movie.vote_count}
                </p>
              </div>
            </div>
            <div className='flex'>
              {genreTitles.length > 2
                ? genreTitles.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className='text-xs text-gray-500 dark:text-gray-400'
                    >
                      🔹{genre}
                    </span>
                  ))
                : genreTitles.map((genre, index) => (
                    <span
                      key={index}
                      className='text-xs text-gray-500 dark:text-gray-400'
                    >
                      🔹{genre}
                    </span>
                  ))}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className='bg-slate-200 dark:bg-slate-800 max-w-full lg:max-w-screen-lg overflow-y-auto max-h-screen pt-6'>
          <DialogHeader>
            <DialogTitle className='p-0'></DialogTitle>
            <DialogDescription className='p-0'></DialogDescription>
          </DialogHeader>
          <div className='flex flex-col lg:flex-row gap-4 items-center'>
            {/* <div className='flex flex-1'>
              <YoutubePlayer videoId={youtubeId} />
            </div> */}
            <div className='flex flex-2 lg:flex-1 aspect-video items-center'>
              <iframe
                className='w-full h-[27vh] md:h-[50vh]'
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
            <div className='flex flex-1 flex-col gap-2 text-slate-600 dark:text-slate-400 px-4'>
              <div className='text-slate-900 dark:text-slate-100'>
                {movie.title}
              </div>
              <h2>
                Original title:{' '}
                <span className='text-lg text-slate-950 dark:text-slate-200'>
                  {movie.original_title}
                </span>
              </h2>
              <div className='flex items-center justify-between mb-4'>
                <span className='text-slate-950 dark:text-slate-200'>
                  {movie.release_date}
                </span>
                <span className='text-slate-950 dark:text-slate-200'>
                  {hours}h {minutes}min
                </span>
              </div>
              <div className='mb-4 text-slate-800 dark:text-slate-300'>
                {movie.overview}
              </div>
              <div>
                Director:{' '}
                <span className='text-sm text-slate-950 dark:text-slate-200'>
                  🔹{credits.director[0]}
                </span>
              </div>
              <div>
                Writers:{' '}
                {credits.writers.map((writer, index) => (
                  <span
                    key={index}
                    className='text-sm text-slate-950 dark:text-slate-200'
                  >
                    🔹{writer}
                  </span>
                ))}
              </div>
              <div>
                Stars:{' '}
                {credits.stars.map((star, index) => (
                  <span
                    key={index}
                    className='text-sm text-slate-950 dark:text-slate-200'
                  >
                    🔹{star}
                  </span>
                ))}
              </div>
              <div className='flex'>
                Genre:
                {genreTitles &&
                  genreTitles?.map((genre, index) => (
                    <span
                      key={index}
                      className='text-sm text-slate-950 dark:text-slate-200'
                    >
                      🔹{genre}
                    </span>
                  ))}
              </div>

              <div className='flex items-center justify-between mt-4 pb-4 md:pb-0'>
                <div className='flex flex-row gap-2 items-center'>
                  <Image
                    src='./star.svg'
                    alt='star'
                    width={18}
                    height={18}
                    className='object-contain'
                  />
                  <p className='text-base font-bold text-[#FFAD49]'>
                    {movie.vote_average.toFixed(1)}
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      /10
                    </span>
                  </p>
                </div>

                <div className='flex flex-row gap-2 items-center'>
                  <Image
                    src='./like.svg'
                    alt='counts'
                    width={18}
                    height={18}
                    className='object-contain text-white'
                  />
                  <p className='text-base text-gray-500 dark:text-gray-400 font-bold'>
                    {movie.vote_count}
                  </p>
                </div>

                <div className='flex flex-row gap-2 items-center'>
                  <Image
                    src='./trending-up.svg'
                    alt='votes'
                    width={18}
                    height={18}
                    className='object-contain text-white'
                  />
                  <p className='text-base text-gray-500 dark:text-gray-400 font-bold'>
                    {movie.popularity.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MotionDiv>
  )
}

export default MovieCard
