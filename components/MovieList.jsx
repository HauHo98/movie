"use client"
import {nanoid} from "nanoid";
import React from "react";
import MovieCard from "./MovieCard";
import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {loaderState} from "../constants/state";
import ReactPaginate from "react-paginate";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const itemsPerPage = 10;

function MovieList(props) {
	const {data, pagination} = props.movies;
	const router = useRouter();
	const loader = useRecoilValue(loaderState)

	const pageCount = Math.ceil(pagination.total / pagination.post_per_page);

	const handlePageClick = (event) => {
		router.push({
			pathname: router.query.id,
			query: {page: event.selected + 1},
		});
	};


	return <>
		<div
			className="container relative mx-auto md:px-4 md:pt-4 md:pt-10">
			{loader ? <div className='fixed w-full h-screen z-50 top-0 left-0'><span
				className="loader absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></span>
				<div className="bg-[#181e30] w-full h-full absolute top-0 left-0"></div>
			</div> : <motion.div
				layout className="w-full md:p-2
      grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
      relative
      gap-2 sm:gap-5
      justify-center"
			>
				<AnimatePresence>
					{data.map((item) => (
						<MovieCard movie={item} key={nanoid()}/>
					))}
				</AnimatePresence>
			</motion.div>}
		</div>
		{pagination.total > 1 && <ReactPaginate
			breakLabel="..."
			nextLabel={<div className="flex items-center gap-2">Next <FaArrowRight/></div>}
			onPageChange={handlePageClick}
			pageRangeDisplayed={3}
			pageCount={pageCount}
			previousLabel={<div className="flex items-center gap-2"><FaArrowLeft/> Prev</div>}
			renderOnZeroPageCount={null}
			className="my-10 flex flex-wrap justify-center gap-2 md:my-12 md:p-4 md:p-20"
			activeClassName='bg-yellow-400'
			disabledClassName='bg-zinc-800'
			previousClassName='flex items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
			nextClassName='flex items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
			pageClassName='flex items-center justify-center p-2 bg-white text-slate-700 w-10 h-10 rounded-full'
		/>}
	</>
}

export default MovieList;