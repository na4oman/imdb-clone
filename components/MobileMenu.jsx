'use client'

import React, { useEffect, useRef, useState } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { ToggleButton } from './ToggleButton'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { searchMoviesByQuery } from '@/app/action'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const resultsRef = useRef(null)

  useEffect(() => {
    // fetch movies from DB
    const fetchedMovies = async () => {
      const res = await searchMoviesByQuery(query)
      setMovies(res)
    }

    fetchedMovies()
  }, [query])

  const filteredMovies = movies
    ?.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 8)

  const showSearch = () => {
    setIsOpen(true)
  }

  const closeSearch = () => {
    setIsOpen(false)
  }

  function handleClick(id) {
    router.push(`/movies/${id}`)
    setQuery('')
    closeSearch()
  }

  function handleFocus() {
    setOpen(true)
  }

  function handleBlur() {
    setTimeout(() => {
      setOpen(false)
    }, 200)
  }

  return (
    <div className='py-2 px-2 flex justify-between items-center z-50'>
      <Sheet>
        <SheetTrigger>
          <Image
            src='/hamburger-menu.svg'
            alt='mobile menu'
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className='w-3/4 min-w-[300px]' side={'left'}>
          <SheetHeader>
            <SheetTitle>
              <Link href='/' className='flex items-center gap-1'>
                <span className='text-[#FFAD49] font-bold text-xl'>IMDB</span>{' '}
                Clone
              </Link>
            </SheetTitle>
            <SheetDescription className='links flex flex-col gap-2 text-sm'>
              <Link href='/popular'>POPULAR</Link>
              <Link href='/top-rated'>TOP RATED</Link>
              <Link href='/now-playing'>NOW PLAYING</Link>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className='link text-lg flex items-center'>
        <Link href='/' className='flex items-center gap-1'>
          <span className='text-[#FFAD49] font-bold text-xl'>IMDB</span> Clone
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <svg
          width='20px'
          height='20px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          onClick={showSearch}
        >
          <path
            d='M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <ToggleButton />
      </div>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full z-99999 open-search'>
          <input
            className='input border p-4 px-2 outline-none bg-slate-300 dark:bg-slate-800 rounded-sm text-lg'
            style={{
              width: '100%',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '10px',
            }}
            type='text'
            placeholder='Search movie...'
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              document.body.className = 'overflow-hidden'
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button className='button-close' onClick={closeSearch}>
            <X className='h-5 w-5' />
            <span className='sr-only'>Close</span>
          </button>
          {filteredMovies && (
            <ul
              ref={resultsRef}
              className='absolute top-5 left-0 right-0 bg-gray-100 text-gray-800 z-999 overflow-y-auto max-h-screen h-dvh '
              style={{
                zIndex: 99999999,
              }}
            >
              {filteredMovies.map(movie => (
                <li
                  key={movie.id}
                  onClick={() => handleClick(movie.id)}
                  style={{
                    zIndex: 99999,
                    width: '100%',
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
      )}
    </div>
  )
}

export default MobileMenu
