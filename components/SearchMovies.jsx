'use client'

import { searchMoviesByQuery } from '@/app/action'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function SearchMovies() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const resultsRef = useRef(null)

  const filteredMovies = movies
    ?.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8)

  // console.log(filteredMovies)

  useEffect(() => {
    // fetch movies from DB
    const fetchedMovies = async () => {
      const res = await searchMoviesByQuery(query)
      setMovies(res)
    }

    fetchedMovies()
  }, [query])

  function handleFocus() {
    setOpen(true)
  }

  function handleBlur() {
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }

  function handleClick(id) {
    router.push(`/movies/${id}`)
    handleBlur()
    setQuery('')
  }

  return (
    <div className='relative'>
      <input
        className='input border p-4 px-2 outline-none bg-slate-300 dark:bg-slate-800 rounded-sm'
        style={{
          width: '25rem',
          paddingTop: '5px',
          paddingBottom: '5px',
        }}
        type='text'
        placeholder='Search movie...'
        value={query}
        onChange={e => {
          setQuery(e.target.value)
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {open && (
        <ul
          ref={resultsRef}
          className='absolute top-5 left-0 right-0 bg-gray-100 text-gray-800 z-999'
          style={{
            zIndex: 99999,
          }}
        >
          {filteredMovies.map(movie => (
            <li
              key={movie.id}
              onClick={() => handleClick(movie.id)}
              style={{
                zIndex: 99999,
                width: '25rem',
                background: '#334155',
                color: '#f1f5f9',
              }}
            >
              <Link
                href={`/movies/${movie.id}`}
                className='flex gap-6 border bg-slate-900 hover:bg-slate-800 cursor-pointer'
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                  alt={movie.title}
                  width={100}
                  height={60}
                  className='rounded-xs cursor-pointer'
                />
                <div className='flex flex-col gap-2 py-4'>
                  <span className='text-lg font-bold'>{movie.title}</span>
                  <span className='text-sm'>{movie.release_date}</span>
                  <div className='flex gap-4 items-center'>
                    <div className='flex flex-row gap-2 items-center'>
                      <Image
                        src='/star.svg'
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
                        src='/like.svg'
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
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
