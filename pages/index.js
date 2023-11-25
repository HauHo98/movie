import Head from 'next/head'
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import {AnimatePresence, motion} from 'framer-motion';
import {useSetRecoilState} from "recoil";
import {headerState} from "../constants/state";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Home(props) {
	const router = useRouter();
	const setHeader = useSetRecoilState(headerState);
	useEffect(() => {
		setHeader(props.categories[0].name)
	}, [router])

	return (
		<>
			<Head>
				<title>Movie | Trang chủ</title>
				<meta property="og:title" content="Movie | Trang chủ"/>
				<meta name="description" content="Movies"/>
				<meta property="og:description" content="Movies"/>
				<meta property="og:type" content="website"/>
				<meta name="keywords" content="key words"/>
				<meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE}/>
				<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE}/>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_APP_SITE}/>
			</Head>

			<div className='w-full'>
				<Header/>
				<motion.div
					layout
					className="container relative mx-auto p-4">
					<AnimatePresence>
						<MovieList movies={props.homeData}/>
					</AnimatePresence>
				</motion.div>
			</div>
		</>
	)
}