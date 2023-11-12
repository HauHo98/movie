import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Contextpage from '../Contextpage';

function HeroMovies({ movie }) {
    const { user } = useContext(Contextpage);

    const [isBookmarked, setIsBookmarked] = useState(null);
    useEffect(() => {
        if (localStorage.getItem(movie.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [movie.id]);

    const BookmarkMovie = () => {
        setIsBookmarked(!isBookmarked)
        if (isBookmarked) {
            localStorage.removeItem(movie.id);
        } else {
            localStorage.setItem(movie.id, JSON.stringify(movie));
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="hero relative w-full h-screen  cursor-pointer overflow-hidden">

            {/* bookmark buttons */}
            <button className="absolute bg-black text-white p-2 z-20 right-0 m-3 rounded-full text-xl" onClick={BookmarkMovie}> {isBookmarked ? <AiFillStar /> : <AiOutlineStar />}</button>

            <div className='flex items-center'>
                <div className="w-[50%] h-[650px]">
                    {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
                        <LazyLoadImage effect='blur' className='img object-cover' style={{ width: '100%', height: '100%' }}
                            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
                </div>

                <div className='w-[30%] flex justify-between items-end p-8 z-20'>
                    <div className='text-white'>
                        <h1 className=' text-3xl font-semibold  break-normal break-words'>{movie.title || movie.name}</h1>
                        <p className='py-8'>{movie.overview}</p>
                        <Link to={`/moviedetail/${movie.id}`}
                            className='p-4 px-6 rounded-full text-xl transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-red-700  hover:bg-red-900'>
                            Watch now
                        </Link>
                    </div>
                </div>
            </div>




        </motion.div>
    )
}

export default HeroMovies;