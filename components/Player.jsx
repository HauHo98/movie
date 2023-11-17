"use client";

import React, { useRef } from 'react'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'
import noimage from '../assets/images/movies.jpg';
import Image from "next/image";
const Player = ({movieDetail}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isShowPost, setIsShowPoster] = useState(true);
  const playerRef = useRef(null);

  const onClickButton = () => {
    setIsShowPoster(false);
    setIsPlaying(true)
    setShowPlayButton(false);
  }

  const handleOnEnded = () => {
    setShowPlayButton(true);
  };

  return (
    <div className="container relative mx-auto w-full">
      {showPlayButton && <button className={`${showPlayButton ? 'block' : 'hidden'} w-12 h-12 md:w-24 md:h-24 rounded-full bg-yellow-400 
        absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50
        focus:outline-none flex items-center justify-center`} onClick={() => onClickButton()}>
        <FaPlay className='cursor-pointer text-lg text-white md:text-3xl' /></button>}
      <ReactPlayer url='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
        controls={true}
        playing={isPlaying}
        onPause={() => {
          setShowPlayButton(true);
          setIsPlaying(false);
        }}
        onPlay={onClickButton}
        onEnded={handleOnEnded}
        ref={playerRef}
        width={"100%"} height={'100%'} />
      {isShowPost  ? (movieDetail.backdrop_path === null ?
        <img src={noimage} className='absolute top-0 left-0 h-full w-full object-cover' alt="poster" /> :
        <img src={"https://image.tmdb.org/t/p/original/" + movieDetail.backdrop_path} className='absolute top-0 left-0 h-full w-full object-cover' alt="poster" />
      ) : <></>}
    </div>
  )
}

export default Player