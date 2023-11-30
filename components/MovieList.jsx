"use client"
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MovieCard from './MovieCard';

function MovieList(props) {
	const data = props.movies;
	return <>
		<div
			className="container relative mx-auto md:px-4 md:pt-4 md:pt-10">
			<div
				className="w-full md:p-2
      grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
      relative
      gap-2 sm:gap-5
      justify-center"
			>
				{/* {
			data&& data.length === 0 && <div className='fixed w-full h-screen z-50 top-0 left-0'><span
					className="loader absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></span>
					<div className="bg-[#181e30] w-full h-full absolute top-0 left-0"></div>
				</div>
			} */}
				{data && data.map((movie) => (
					<MovieCard movie={movie} key={nanoid()} />
					
				))}
			</div>
		</div>
	</>
}

export default MovieList;