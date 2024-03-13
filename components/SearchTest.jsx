import React from 'react'

import { movies } from '@/app/_data.ts'
import Image from 'next/image'
import Link from 'next/link'

const SearchTest = () => {
  console.log(movies)

  return (
    <div className='relative'>
      <input
        className='border p-4 w-3/4 px-2 outline-none bg-slate-300 dark:bg-slate-800 rounded-sm'
        style={{
          width: '30rem',
          paddingTop: '5px',
          paddingBottom: '5px',
        }}
        type='text'
        placeholder='Search movies...'
      />
      {
        <ul className='flex flex-col gap-2'>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                href={`/movies/${movie.id}`}
                className='flex gap-6 border bg-slate-900 hover:bg-slate-800 cursor-pointer'
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                  alt={movie.title}
                  width={80}
                  height={80}
                  className='rounded-xs cursor-pointer'
                />
                <div className='flex flex-col py-4'>
                  <span className='text-lg font-bold'>{movie.title}</span>
                  <span className='text-sm'>{movie.overview}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default SearchTest
