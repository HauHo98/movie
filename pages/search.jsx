import MovieList from "../components/MovieList";
import Header from "../components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { loaderState } from "../constants/state";
import { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API;

export default function Search() {
	const router = useRouter();
	const [loader, setLoader] = useRecoilState(loaderState)
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({
		current_page: 1,
		total: 0,
		post_per_page: 10
	})
	const [total, setTotal] = useState(0)

	const pageCount = useMemo(() => Math.ceil(total / pagination.post_per_page), [total])
	const searchQueryParam = router.query.page || '';
	const queryQueryParam = router.query.s || '';

	const handlePageClick = (event) => {
		setLoader(true)
		router.push({
			pathname: router.query.id,
			query: { page: event.selected + 1 },
		});
		setPagination({ ...pagination, current_page: event.selected + 1 })
	};


	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setLoading(true)
		})
	}, [router])

	useEffect(() => {
		setLoading(true)
		setLoader(true)

		setPagination({ ...pagination, current_page: parseInt(searchQueryParam) || 1 })
		setMovies([])

		axios.get(API + 'search?s=' + queryQueryParam + '&page=' + searchQueryParam || '1').then(res => {
			setMovies(res.data.data)
			setTotal(res.data.pagination.total)
		}).catch(() => {
			setMovies([])
			setTotal(0)
		}).finally(() => {
			setLoader(false)
			setLoading(false)
		})
	}, [searchQueryParam, queryQueryParam])

	if (loading) return <div className='fixed w-full h-screen z-50 top-0 left-0'><span
		className="loader absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></span>
		<div className="bg-[#181e30] w-full h-full absolute top-0 left-0"></div>
	</div>

	return (
		<section>
			<Head>
				<title>Movie | Tìm kiếm</title>
				<meta property="og:title" content="Movie | Tìm kiếm" />
				<meta name="description" content="Movies Tìm kiếm" />
				<meta property="og:description" content="Movies Tìm kiếm" />
				<meta property="og:type" content="website" />
				<meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE} />
				<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE} />
				<link rel="canonical" href={process.env.NEXT_PUBLIC_APP_SITE} />
			</Head>
			<div className='mb-20 w-full md:mb-0 md:p-10'>
				<Header />
				<div
					className="container relative mx-auto p-4">
					{loader && <div className='fixed w-full h-screen z-50 top-0 left-0'><span
						className="loader absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></span>
						<div className="bg-[#181e30] w-full h-full absolute top-0 left-0"></div>
					</div>}
					{movies.length > 0 ?
						<>
							<MovieList movies={movies} />
							<ReactPaginate
								breakLabel="..."
								nextLabel={<div className="flex items-center gap-2">Next <FaArrowRight /></div>}
								onPageChange={handlePageClick}
								pageRangeDisplayed={3}
								pageCount={pageCount}
								forcePage={pagination.current_page - 1}
								previousLabel={<div className="flex items-center gap-2"><FaArrowLeft /> Prev</div>}
								renderOnZeroPageCount={null}
								className="my-10 flex flex-wrap justify-center gap-2 md:my-12 md:p-4 md:p-20"
								activeClassName='bg-yellow-400'
								disabledClassName='bg-zinc-800'
								previousClassName='flex items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
								nextClassName='flex items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
								pageClassName='flex items-center justify-center p-2 bg-white text-slate-700 w-10 h-10 rounded-full'
							/></> :
						<div className="text-center text-xl"><p>Không tìm thấy phim</p></div>
					}
				</div>
			</div>
		</section>
	)
}

export async function getStaticProps() {
	return axios.all([
		axios.get(API + 'category'),
		axios.get(API + 'sub-category'),
	]).then(axios.spread((obj1, obj2) => {

		return {
			props: {
				categories: obj1.data,
				categoriesSub: obj2.data
			}, revalidate: 60
		};
	}));
}