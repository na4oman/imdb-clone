'use client'

import Link from 'next/link'
import React from 'react'
import { ToggleButton } from './ToggleButton'
import SearchMovies from './SearchMovies'
import MobileMenu from './MobileMenu'
import { useMediaQuery } from '@/hooks/use-media-query'

const Navbar = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  // console.log(isDesktop)

  return isDesktop ? (
    <div className='sm:px-16 py-4 flex justify-between items-center z-50'>
      <div className='link text-lg flex items-center'>
        <Link href='/' className='flex items-center gap-1'>
          <span className='text-[#FFAD49] font-bold text-xl'>IMDB</span> Clone
        </Link>
      </div>
      <SearchMovies />
      <div className='links desktop-links flex gap-1 text-sm justify-start'>
        <Link href='/popular'>POPULAR</Link>
        <Link href='/top-rated'>TOP RATED</Link>
        <Link href='/now-playing'>NOW PLAYING</Link>
      </div>
      <ToggleButton />
    </div>
  ) : (
    <MobileMenu />
  )
}

export default Navbar
