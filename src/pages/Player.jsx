import React, { useEffect, useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies'
import { useState } from 'react'
import Contextpage from '../Contextpage'
import { HiChevronLeft } from "react-icons/hi";
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'


const Player = () => {

  const { setHeader } = useContext(Contextpage);
  const [moviedet, setMoviedet] = useState([]);
  const { id } = useParams()
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const playerRef = useRef(null);

  const APIKEY = import.meta.env.VITE_API_KEY;
  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
  };

  useEffect(() => {
    fetchMovie()
    setHeader("Player")
  }, []);


  const onClickButton = () => {
    setIsPlaying(true)
    setShowPlayButton(false);
    // You can add additional logic here if needed
    // playerRef.current?.seekTo(0);
    // playerRef.current.play()
  }

  const handleOnEnded = () => {
    // Show the play button again when the video ends
    setShowPlayButton(true);
  };

  // setTimeout(() => {
  //   isPlaying && setShowPlayButton(false);
  // }, 3000);

  document.title = `Movies | ${moviedet.title}`

  return (
    <div className="w-full relative ">
      {/* <button onClick={()=>history.back()} className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></button> */}
      {showPlayButton && <button className={`${showPlayButton ? 'block' : 'hidden'} w-12 h-12 md:w-24 md:h-24 rounded-full bg-blue-500 
        absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50
        focus:outline-none flex items-center justify-center`} onClick={() => onClickButton()}>
        <FaPlay className='text-white text-lg md:text-3xl cursor-pointer' /></button>}
      <ReactPlayer url='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
        controls={true}
        playing={isPlaying}
        onPause={()=> {
          setShowPlayButton(true);
          setIsPlaying(false);
        }}
        onPlay={onClickButton}
        onEnded={handleOnEnded}
        ref={playerRef}
        playIcon={<div>ádasdk</div>}
        width={"100%"} height={'100%'} />
    </div>
  )
}

export default Player