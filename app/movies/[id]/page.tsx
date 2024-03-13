'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  fetchMovieCredits,
  fetchMovieDetails,
  getYoutubeId,
} from '@/app/action'
import YoutubePlayer from '@/components/YoutubePlayer'
import Image from 'next/image'

const Movie = () => {
  const params = useParams()
  const id = Number(params.id)
  const [movie, setMovie] = useState({} as any)

  useEffect(() => {
    fetchMovieDetails(id).then(res => {
      setMovie(res)
    })
    getYoutubeId(id).then(res => {
      setMovie((prev: any) => ({ ...prev, youtubeId: res }))
    })
    fetchMovieCredits(id).then(res => {
      setMovie((prev: any) => ({ ...prev, credits: res }))
    })
  }, [id])

  const hours = Math.floor(movie.runtime / 60)
  const minutes = movie.runtime % 60

  // console.log(movie)

  return (
    <div className='flex flex-col max-h-[100dvh] pb-24 lg:pb-0 overflow-y-auto lg:flex-row gap-8'>
      {/* <div className='flex flex-2 lg:flex-1 aspect-w-16 aspect-h-9 items-center'>
        <YoutubePlayer videoId={movie.youtubeId} />
      </div> */}
      <div className='flex flex-2 lg:flex-1 aspect-w-16 aspect-h-9 items-center'>
        <iframe
          className='w-full h-[30vh] md:h-[50vh]'
          src={`https://www.youtube.com/embed/${movie.youtubeId}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>

      <div className='flex flex-1 flex-col gap-2 text-slate-600 dark:text-slate-400 p-4'>
        <div className='text-slate-900 dark:text-slate-100 text-2xl font-bold'>
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
            🔹{movie?.credits?.director[0]}
          </span>
        </div>
        <div>
          Writers:{' '}
          {movie?.credits?.writers.map((writer: any, index: number) => (
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
          {movie?.credits?.stars.map((star: any, index: number) => (
            <span
              key={index}
              className='text-sm text-slate-950 dark:text-slate-200'
            >
              🔹{star}
            </span>
          ))}
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
          Genre:
          {movie?.genres?.map((genre: any, index: number) => {
            return (
              <span
                key={genre.id}
                className='text-sm text-slate-950 dark:text-slate-200'
              >
                🔹{genre.name}
              </span>
            )
          })}
        </div>

        <div className='flex items-center justify-between mt-4'>
          <div className='flex flex-row gap-2 items-center'>
            <Image
              src='/star.svg'
              alt='star'
              width={18}
              height={18}
              className='object-contain'
            />
            <p className='text-base font-bold text-[#FFAD49]'>
              {movie?.vote_average?.toFixed(1)}
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                /10
              </span>
            </p>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <Image
              src='/like.svg'
              alt='likes'
              width={18}
              height={18}
              className='object-contain text-white'
            />
            <p className='text-base text-gray-500 dark:text-gray-400 font-bold'>
              {movie?.vote_count}
            </p>
          </div>

          <div className='flex flex-row gap-2 items-center'>
            <Image
              src='/trending-up.svg'
              alt='votes'
              width={18}
              height={18}
              className='object-contain text-white'
            />
            <p className='text-base text-gray-500 dark:text-gray-400 font-bold'>
              {movie?.popularity?.toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
