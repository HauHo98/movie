"use client";
import React from 'react'
import Link from 'next/link';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useSetRecoilState} from "recoil";
import {headerState, loaderState} from "../constants/state";

function MovieCard({movie}) {
	const setHeader = useSetRecoilState(headerState);
	const setLoader = useSetRecoilState(loaderState);

	return (
		<div
			className="card relative bg-white group
            rounded-lg hover:z-30  overflow-hidden
            transform transition duration-500 hover:scale-110
            aspect-[9/14]
            cursor-pointer">

			<div
				className='absolute bottom-0 z-20 flex w-full flex-col justify-between rounded-lg bg-gradient-to-t from-black p-3'>
				<h1
					className='break-normal break-words font-semibold leading-4 text-white text-md line-clamp-2 lg:text-lg'>{movie.title}</h1>
				<p className='text-sm text-slate-300 line-clamp-1'>{movie.short_description}</p>
				{/* {(movie.vote_average||0) > 7 ? <h1 className='rounded-full bg-zinc-900 p-2 font-bold text-green-500'>{(movie.vote_average||0).toFixed(1)}</h1> : (movie.vote_average||0) > 5.5 ? <h1 className='rounded-full bg-zinc-900 p-2 font-bold text-orange-400'>{(movie.vote_average||0).toFixed(1)}</h1> : <h1 className='rounded-full bg-zinc-900 p-2 font-bold text-red-600'>{(movie.vote_average||0).toFixed(1)}</h1>} */}
			</div>

			<Link href={`/movie/${movie.slug}`}>
				<a className='absolute z-10 h-full w-full cursor-pointer shadow overflow-hidden' onClick={() => {
					setLoader(true);
					setHeader("")
				}}>
					<div className="w-full h-full">
						{!movie.thumbnailUrl ?
							<img className='object-cover img rounded-lg h-full overflow-hidden' src="/no-image.jpg" alt="no image"/> :
							<LazyLoadImage effect='blur' className='object-cover img rounded-lg '
														 src={movie.thumbnailUrl}/>}
					</div>
				</a>
			</Link>

		</div>
	)
}

export default MovieCard
