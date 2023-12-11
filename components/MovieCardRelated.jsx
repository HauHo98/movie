"use client";
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSetRecoilState } from 'recoil';
import { loaderState } from '../constants/state';

function MovieCardRelated({ movie }) {
	const setLoader = useSetRecoilState(loaderState);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 1 }}
			layout
			className="card relative bg-white
            rounded-lg z-30 
            transform lg:transition lg:duration-500 lg:hover:scale-110 overflow-hidden
            aspect-[9/14]
            cursor-pointer">



			<Link href={`/movie/${movie.slug}`}>
				<a className='absolute z-30 h-full w-full shadow top-0 left-0' onClick={()=> setLoader(true)}>
					<div
						className='absolute bottom-0 z-20 flex w-full items-end justify-between rounded-lg bg-gradient-to-t from-black p-1 md:p-3'>
						<h2 className='break-normal break-words font-semibold text-white text-sm md:text-lg' dangerouslySetInnerHTML={{__html: movie.title}}></h2>
					</div>
					{!movie.thumbnailUrl ? <img className='rounded-lg object-cover img h-full' src="/no-image.jpg" alt="" /> :
						<LazyLoadImage effect='blur' className='object-cover img rounded-lg w-full h-full' src={movie.thumbnailUrl} alt="" />}
				</a>
			</Link>


		</motion.div>
	)
}

export default MovieCardRelated
