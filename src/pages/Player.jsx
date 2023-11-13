import React, { useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'
import noimage from '../assets/images/movies.jpg';
import ContextPage from '../Contextpage'

const API_KEY = process.env.REACT_APP_API_KEY;

const Player = () => {
  const { setHeader } = useContext(ContextPage);
  const [movieDetail, setMovieDetail] = useState([]);
  const { id } = useParams()
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isShowPost, setIsShowPoster] = useState(true);
  const playerRef = useRef(null);


  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const movie = await data.json();
    setMovieDetail(movie);
  };

  useEffect(() => {
    fetchMovie()
    setHeader("Player")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onClickButton = () => {
    setIsShowPoster(false);
    setIsPlaying(true)
    setShowPlayButton(false);
  }

  const handleOnEnded = () => {
    setShowPlayButton(true);
  };

  return (
    <div className="relative w-full container mx-auto">
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
        <img src={noimage} className='absolute top-0 left-0 h-full w-full' alt="poster" /> :
        <img src={"https://image.tmdb.org/t/p/original/" + movieDetail.backdrop_path} className='absolute top-0 left-0 h-full w-full' alt="poster" />
      ) : <></>}
    </div>
  )
}

export default Player