'use client'

import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { getYoutubeId, nowPlaying } from '@/app/action'

const VideoPlayer = ({ onSetMovie }: any) => {
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
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  return <YouTube videoId={videoId} opts={opts} className='video-player' />
}

export default VideoPlayer
