'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { fetchMovies } from '@/app/action'
import MovieCard from './MovieCard'

let page = 2

export type MovieCard = JSX.Element

function LoadMore({ type }: any) {
  const { ref, inView } = useInView()

  const [data, setData] = useState<MovieCard[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (inView) {
      setIsLoading(true)
      // Add a delay of 100 milliseconds
      const delay = 100

      const timer = setTimeout(() => {
        fetchMovies(type, page).then(res => {
          setData([...data, ...res])
          page++
        })

        setIsLoading(false)
      }, delay)

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timer)
    }
  }, [inView, data, isLoading, type])

  return (
    <>
      <section className='section'>{data}</section>
      <section ref={ref} className='flex justify-center items-center w-full'>
        <div>
          <Image
            src='./spinner.svg'
            alt='spinner'
            width={56}
            height={56}
            className='object-contain'
          />
        </div>
      </section>
    </>
  )
}

export default LoadMore
