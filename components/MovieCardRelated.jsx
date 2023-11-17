"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import noImage from '../assets/images/no-image.jpg'
import 'react-lazy-load-image-component/src/effects/blur.css';

function MovieCardRelated({ movie }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="card relative bg-white
            rounded-lg z-30 
            transform lg:transition lg:duration-500 lg:hover:scale-125
            aspect-[9/14]
            cursor-pointer">

            <div className='absolute bottom-0 z-20 flex w-full items-end justify-between rounded-lg bg-gradient-to-t from-black p-1 md:p-3'>
                <h2 className='break-normal break-words font-semibold text-white md:text-lg'>{movie.title || movie.name}</h2>
            </div>

            <Link href={`/movie/${movie.id}`}>
              <a className='absolute z-10 h-full w-full shadow'>
                {movie.poster_path === null ? <Image className='rounded-lg object-cover img' src={noImage} alt=""/> :
                  <LazyLoadImage effect='blur' className='rounded-lg object-cover img' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt=""/>}
              </a>
            </Link>


        </motion.div>
    )
}

export default MovieCardRelated
