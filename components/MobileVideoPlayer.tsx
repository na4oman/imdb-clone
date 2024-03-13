'use client'

import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { getRandomMovie, getYoutubeId, nowPlaying } from '@/app/action'
import { Skeleton } from '@/components/ui/skeleton'

const MobileVideoPlayer = ({ onSetMovie }: any) => {
  // const videoId = 'UGc5Tzz19UY'

  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const movie = await nowPlaying(1)
      const id = await getYoutubeId(movie?.id)

      setVideoId(id)
      onSetMovie(movie)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(videoId)

  const opts = {
    height: '240',
    width: '480',
    playerVars: {
      autoplay: 1,
    },
  }

  return <YouTube videoId={videoId} opts={opts} />
}

export default MobileVideoPlayer
