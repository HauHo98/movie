"use client";
import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link';
import {LazyLoadImage} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

function MovieCardRelated({movie}) {
	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 1}}
			layout
			className="card relative bg-white
            rounded-lg z-30 
            transform lg:transition lg:duration-500 lg:hover:scale-110 overflow-hidden
            aspect-[9/14]
            cursor-pointer">

			<div
				className='absolute bottom-0 z-20 flex w-full items-end justify-between rounded-lg bg-gradient-to-t from-black p-1 md:p-3'>
				<h2 className='break-normal break-words font-semibold text-white md:text-lg'>{movie.title}</h2>
			</div>

			<Link href={`/movie/${movie.id}`}>
				<a className='absolute z-10 h-full w-full shadow'>
					{!movie.thumbnailUrl ? <img className='rounded-lg object-cover img h-full' src="/no-image.jpg" alt=""/> :
						<LazyLoadImage effect='blur' className='rounded-lg object-cover img' src={movie.thumbnailUrl} alt=""/>}
				</a>
			</Link>


		</motion.div>
	)
}

export default MovieCardRelated
