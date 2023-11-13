import React from 'react'
import {Link} from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function MovieCard({movie}) {
	return (
		<div
			className="card relative bg-white group
            rounded-lg hover:z-30 
            transform transition duration-500 hover:scale-110
            aspect-[9/14]
            cursor-pointer">

			<div
				className='absolute bottom-0 z-20 flex w-full flex-col justify-between rounded-lg bg-gradient-to-t from-black p-3'>
				<h1
					className='break-normal break-words font-semibold leading-4 text-white text-md line-clamp-2 lg:text-lg'>{movie.title || movie.name}</h1>
				<p className='text-sm text-slate-300 line-clamp-1'>{movie.overview}</p>
				{/* {(movie.vote_average||0) > 7 ? <h1 className='rounded-full bg-zinc-900 p-2 font-bold text-green-500'>{(movie.vote_average||0).toFixed(1)}</h1> : (movie.vote_average||0) > 5.5 ? <h1 className='rounded-full bg-zinc-900 p-2 font-bold text-orange-400'>{(movie.vote_average||0).toFixed(1)}</h1> : <h1 className='rounded-full bg-zinc-900 p-2 font-bold text-red-600'>{(movie.vote_average||0).toFixed(1)}</h1>} */}
			</div>

			<Link to={`/movie/${movie.id}`} className='absolute z-10 h-full w-full shadow'></Link>
			<div>
				{movie.poster_path === null ? <img className='object-cover img' src={noimage}/> :
					<LazyLoadImage effect='blur' className='object-cover img'
												 src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}/>}
			</div>
		</div>
	)
}

export default MovieCard
