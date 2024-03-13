'use client'

import React from 'react'
import YouTube from 'react-youtube'

const YoutubePlayer = ({ videoId }: any) => {
  // let opts = {
  //   height: '400',
  //   width: '600',
  //   playerVars: {
  //     autoplay: 1,
  //   },
  // }

  return <YouTube videoId={videoId} />
}

export default YoutubePlayer
