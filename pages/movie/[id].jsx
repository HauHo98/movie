"use client"
import Head from "next/head";
import Player from "../../components/Player";
import {nanoid} from "nanoid";
import {FaCaretRight} from "react-icons/fa";
import MovieCardRelated from "../../components/MovieCardRelated";
import React, {useEffect, useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {headerState, loaderState} from "../../constants/state";
import {useRouter} from "next/router";

const API = process.env.NEXT_PUBLIC_API;
export default function MovieDetail({movieDetail, related}) {
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

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "VideoObject",
		"name": movieDetail.title,
		"description": movieDetail.short_description,
		"thumbnailUrl": [
			movieDetail.thumbnailUrl || ''
		],
		"uploadDate": new Date(movieDetail.date),
		"contentUrl": movieDetail.link_video,
		"embedUrl": movieDetail.link_video,
		"interactionStatistic": {
			"@type": "InteractionCounter",
			"interactionType": {"@type": "WatchAction"},
			"userInteractionCount": 5647018
		},
		"regionsAllowed": "US,NL"
	}

	if (loader) return <div className='fixed w-full h-screen z-50 top-0 left-0'><span
		className="loader absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></span>
		<div className="bg-[#181e30] w-full h-full absolute top-0 left-0"></div>
	</div>

	return <>
		<Head>
			<title>Movies | {movieDetail.title}</title>
			<meta property="og:title" content={`Movie | ${movieDetail.title}`}/>
			<meta name='description' content={movieDetail.short_description}/>
			<meta property="og:description" content={movieDetail.short_description}/>
			<meta property="og:type" content="website"/>
			{/*<meta name="keywords" content={movieDetail.genres.map(item => item.name).join(',')}/>*/}
			<meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE + '/movie/' + router.query.id}/>
			<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE + '/movie/' + router.query.id}/>
			<meta property="og:image" content={movieDetail.thumbnailUrl || ''}/>
			<meta name="og:image" content={movieDetail.thumbnailUrl || ''}/>
			<meta property="twitter:image" content={movieDetail.thumbnailUrl || ''}/>
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
				<h2
					className='px-3 pt-5 text-center text-white font-Roboto text-[18px] md:px-60'>{movieDetail.short_description}</h2>
				<div className='my-3 flex justify-center font-semibold text-blue-100'>
					<h2 className='rounded-full border-2 border-blue-700 bg-blue-600/30 px-3 py-2'>Ngày phát hành
						: {movieDetail.date}</h2>
				</div>
			</div>

			<div className='flex flex-col p-4'>
				<h2 className="p-2 text-xl font-semibold">Thể loại</h2>
				<div className='flex flex-wrap gap-2'>
					{/*{movieDetail.genres.map((tag) => (*/}
					{/*	<div key={tag.id} className='rounded-full bg-gray-800 px-4 py-1 font-semibold text-white'>{tag.name}</div>*/}
					{/*))}*/}
				</div>
			</div>

			{/*{castData.length > 0 && <div className='flex flex-col p-4'>*/}
			{/*	<h2 className="p-2 text-xl font-semibold">Diễn viên</h2>*/}
			{/*	<div className="md:px-5 flex flex-row max-w-full flex-start overflow-x-auto relative*/}
			{/*scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">*/}
			{/*		{castData.map((cast) => (*/}
			{/*			<div key={nanoid()}>*/}
			{/*				{cast.profile_path !== null ? <div*/}
			{/*					className='mx-1 flex h-full flex-col items-center text-center min-w-[6rem] max-w-[9rem] md:min-w-[10rem] md:max-w-[10rem]'>*/}
			{/*					<img src={"https://image.tmdb.org/t/p/w500" + cast.profile_path}*/}
			{/*							 alt="Picture of the author" />*/}
			{/*					<p className='text-white'>{cast.name}</p>*/}
			{/*					<p className='text-amber-100'>({cast.character})</p>*/}
			{/*				</div> : null}*/}
			{/*			</div>*/}
			{/*		))}*/}
			{/*	</div>*/}
			{/*</div>}*/}

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
	const {id} = context.query;
	const data = await fetch(API + 'post/' + id);
	const resultMovie = await data.json();

	const dataRelated = await fetch(API + 'posts-category/' + 'phim-viet-nam');
	const dataRelatedJson = await dataRelated.json();

	return {props: {movieDetail: resultMovie.data, related: dataRelatedJson.data.filter(item => item.slug !== id) || []}}
}