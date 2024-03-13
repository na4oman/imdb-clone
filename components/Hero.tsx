'use client'

import { getYoutubeId, nowPlaying } from '@/app/action'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { genres } from '@/app/constants'
import { Skeleton } from '@/components/ui/skeleton'
import { MovieProp } from '@/app/types/types'
import ReactPlayer from 'react-player'

function Hero() {
  const [movie, setMovie] = useState<MovieProp>()
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const movie = await nowPlaying(1)
      setMovie(movie)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (movie) {
      getYoutubeId(movie?.id).then(id => {
        setVideoId(id)
      })
    }
  }, [movie])

  // console.log(movie)
  // console.log(videoId)

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const genreTitles = movie?.genre_ids
    .map(id => {
      const matchedGenres = genres.find(obj => obj.id === id)
      return matchedGenres ? matchedGenres.name : null
    })
    .filter(name => name !== null)

  // const handleMovie = (fetchedMovie: any) => {
  //   setMovie(fetchedMovie)
  // }

  // console.log(movie)

  return (
    <header className='sm:py-6 py-16 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0 items-center overflow-x-hidden'>
      <div className='flex flex-col lg:flex-row gap-6 xl:gap-10 items-center'>
        {
          <div className='bg-inherit flex lg:flex-1 w-full h-[220px] sm:h-[320px]'>
            {!videoId ? (
              <Skeleton />
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                controls
                className='video-player'
                config={{
                  youtube: {
                    playerVars: { origin: 'http://localhost:3000' }, // Adjust origin as needed
                  },
                }}
              />
            )}
          </div>
        }

        <div className='py-4 px-2 flex lg:flex-1 flex-col gap-3'>
          <div className='flex flex-col justify-between items-center gap-1'>
            <h1 className='font-bold text-slate-800 dark:text-slate-200 text-2xl md:text-3xl line-clamp-1 w-full text-center'>
              {movie?.title}
            </h1>
            <div className='py-1 px-2 bg-[#7f7f7f] rounded-sm'>
              <p className='text-slate-300 text-md font-bold capitalize'>
                <span className='text-slate-200'>Release date: </span>
                <span className='text-[#FFAD49]'>{movie?.release_date}</span>
              </p>
            </div>
            <div className='text-slate-700 dark:text-slate-300'>
              {movie?.overview}
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
                {movie?.vote_average.toFixed(1)}
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  /10
                </span>
              </p>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <Image
                src='./like.svg'
                alt='like'
                width={18}
                height={18}
                className='object-contain'
              />
              <p className='text-base font-bold text-gray-500 dark:text-gray-400'>
                {movie?.vote_count}
              </p>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <Image
                src='./trending-up.svg'
                alt='episodes'
                width={20}
                height={20}
                className='object-contain'
              />
              <p className='text-base text-gray-500 dark:text-gray-400 font-bold'>
                {movie?.popularity.toFixed(0) || movie?.vote_count}
              </p>
            </div>
          </div>
          <div className='flex gap-4'>
            {genreTitles &&
              genreTitles?.map((genre, index) => (
                <span
                  key={index}
                  className='text-sm text-gray-500 dark:text-gray-400'
                >
                  🔹{genre}
                </span>
              ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
