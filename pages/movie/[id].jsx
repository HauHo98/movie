"use client"
import Head from "next/head";
import Player from "../../components/Player";
import {nanoid} from "nanoid";
import {FaCaretRight} from "react-icons/fa";
import MovieCardRelated from "../../components/MovieCardRelated";
import {useEffect, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {headerState, loaderState} from "../../constants/state";
import {useRouter} from "next/router";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function MovieDetail({movieDetail, castData, related}) {
	const [isClient, setIsClient] = useState(false)
	const setHeader = useSetRecoilState(headerState);
	const [loader, setLoader] = useRecoilState(loaderState)
	const router = useRouter();

	useEffect(() => {
		setIsClient(true)
		setHeader("detail")

		if (typeof window !== 'undefined') {
			setLoader(false)
		}
	}, [])

	console.log(movieDetail)
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "VideoObject",
		"name": movieDetail.title,
		"description": movieDetail.overview,
		"thumbnailUrl": [
			"https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path
		],
		"uploadDate": new Date(movieDetail.release_date),
		"contentUrl": "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
		"embedUrl": "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
		"interactionStatistic": {
			"@type": "InteractionCounter",
			"interactionType": {"@type": "WatchAction"},
			"userInteractionCount": 5647018
		},
		"regionsAllowed": "US,NL"
	}

	if (!movieDetail || loader) return <div className='flex h-screen w-full items-center justify-center'><span
		className="m-10 loader"></span></div>

	return <>
		<Head>
			<title>Movies | {movieDetail.title}</title>
			<meta property="og:title" content={`Movie | ${movieDetail.title}`}/>
			<meta name='description' content={movieDetail.overview}/>
			<meta property="og:description" content={movieDetail.overview}/>
			<meta property="og:type" content="website"/>
			<meta name="keywords" content={movieDetail.genres.map(item => item.name).join(',')}/>
			<meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE + '/movie/' +  router.query.id}/>
			<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE + '/movie/' +router.query.id}/>
			<meta property="og:image" content={"https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path}/>
			<meta name="og:image" content={"https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path} />
			<meta property="twitter:image" content={"https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path} />
			<link rel="canonical" href={process.env.NEXT_PUBLIC_APP_SITE + '/movie/' + router.query.id}/>
			<script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}></script>
		</Head>

		<div className='container mx-auto'>
			<div className='relative flex'>
				<div className='absolute h-full w-full'></div>
				<h1 className='p-5 text-center text-2xl font-bold text-white'>{movieDetail.title}</h1>
			</div>
			<div className="px-3">
				{isClient && <Player movieDetail={movieDetail}/>}
			</div>

			<div>
				<h2 className='px-3 pt-5 text-center text-white font-Roboto text-[18px] md:px-60'>{movieDetail.overview}</h2>
				<div className='my-3 flex justify-center font-semibold text-blue-100'>
					<h2 className='rounded-full border-2 border-blue-700 bg-blue-600/30 px-3 py-2'>Ngày phát hành
						: {movieDetail.release_date}</h2>
				</div>
			</div>

			<div className='flex flex-col p-4'>
				<h2 className="p-2 text-xl font-semibold">Thể loại</h2>
				<div className='flex flex-wrap gap-2'>
					{movieDetail.genres.map((tag) => (
						<div key={tag.id} className='rounded-full bg-gray-800 px-4 py-1 font-semibold text-white'>{tag.name}</div>
					))}
				</div>
			</div>

			{castData.length > 0 && <div className='flex flex-col p-4'>
				<h2 className="p-2 text-xl font-semibold">Diễn viên</h2>
				<div className="md:px-5 flex flex-row max-w-full flex-start overflow-x-auto relative
      scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
					{castData.map((cast) => (
						<div key={nanoid()}>
							{cast.profile_path !== null ? <div
								className='mx-1 flex h-full flex-col items-center text-center min-w-[6rem] max-w-[9rem] md:min-w-[10rem] md:max-w-[10rem]'>
								<img src={"https://image.tmdb.org/t/p/w500" + cast.profile_path}
										 alt="Picture of the author" />
								<p className='text-white'>{cast.name}</p>
								<p className='text-amber-100'>({cast.character})</p>
							</div> : null}
						</div>
					))}
				</div>
			</div>}

			{related.length > 0 && <div className='flex flex-col p-4'>
				<div className="flex justify-between">
					<h2 className="py-2 text-xl font-semibold">Phim cùng thể loại</h2>
					<div className='flex items-center gap-1'>Xem thêm <FaCaretRight/></div>
				</div>
				<div className="w-full md:p-2
                   grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                   relative
                   gap-2 sm:gap-5
                   justify-center">
					{related &&
						related.slice(0, 5).map((item) => (
							<MovieCardRelated key={nanoid()} movie={item}/>
						))}
				</div>
			</div>
			}
		</div>
	</>
}
export async function getServerSideProps(context) {
	const { id } = context.query;
	const data = await fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
	);
	const resultMovie = await data.json();

	const castData = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language`
	);

	const castDetail = await castData.json();

	const dataRelated = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${resultMovie.genres[0].name}&api_key=${API_KEY}&with_origin_country=IN&page=1`
	);
	const dataJson = await dataRelated.json();

	return { props: {movieDetail: resultMovie, castData: castDetail.cast || [], related: dataJson.results || []} }
}