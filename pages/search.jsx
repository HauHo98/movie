import MovieList from "../components/MovieList";
import {AnimatePresence} from "framer-motion";
import Header from "../components/Header";
import Head from "next/head";

const API = process.env.NEXT_PUBLIC_API;

export default function Search({searchResult}) {
	return (
		<section>
			<Head>
				<title>Movie | Tìm kiếm</title>
				<meta property="og:title" content="Movie | Tìm kiếm"/>
				<meta name="description" content="Movies Tìm kiếm"/>
				<meta property="og:description" content="Movies Tìm kiếm"/>
				<meta property="og:type" content="website"/>
				<meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE}/>
				<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE}/>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_APP_SITE}/>
			</Head>
			<div className='mb-20 w-full md:mb-0 md:p-10'>
				<Header/>
				<div
					className="container relative mx-auto p-4">
					<AnimatePresence>
						{searchResult.data.length > 0 ?
							<MovieList movies={searchResult}/> :
							<div className="text-center text-xl"><p>Không tìm thấy phim</p></div>
						}
					</AnimatePresence>
				</div>
			</div>
		</section>
	)
}

export async function getServerSideProps(context) {
	const {s, p} = context.query;
	const data = await fetch(API + 'search?s=' + s);
	const dataJson = await data.json();

	return {
		props: {
			searchResult: dataJson || {
				code: 'fail',
				data: [],
				pagination: {
					current_page: 1,
					total: 0,
					post_per_page: 10
				}
			}
		}
	}
}