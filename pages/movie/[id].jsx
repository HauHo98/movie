import Head from "next/head";
import {nanoid} from "nanoid";
import MovieCardRelated from "../../components/MovieCardRelated";
import React from "react";
import {useRouter} from "next/router";
import axios from "axios";
import VideoPlayer from "../../components/VideoPlayer";

const API = process.env.NEXT_PUBLIC_API;
export default function MovieDetail({movieDetail}) {
	const router = useRouter();

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

	return <>
		<Head>
			<title>Movies | {movieDetail.title}</title>
			<meta property="og:title" content={`Movie | ${movieDetail.title}`}/>
			<meta name='description' content={movieDetail.short_description}/>
			<meta property="og:description" content={movieDetail.short_description}/>
			<meta property="og:type" content="website"/>
			<meta name="keywords" content={movieDetail.category}/>
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
				<h1 className='p-5 text-center text-2xl font-bold text-white' dangerouslySetInnerHTML={{__html: movieDetail.title}}></h1>
			</div>
			<div className="px-3">
				<VideoPlayer src={movieDetail.link_video} />
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
					{movieDetail.category}
				</div>
			</div>

			{movieDetail.related && <div className='flex flex-col p-4'>
				<div className="flex justify-between">
					<h2 className="py-2 text-xl font-semibold">Phim cùng thể loại</h2>
				</div>
				<div className="w-full md:p-2
                   grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5
                   relative
                   gap-2 sm:gap-5
                   justify-center">
					{movieDetail.related &&
						movieDetail.related.slice(0, 5).map((item) => (
							<MovieCardRelated key={nanoid()} movie={item}/>
						))}
				</div>
			</div>
			}
		</div>
	</>
}

export async function getStaticProps({params}) {
	return axios.all([
		axios.get(API + 'category'), 
		axios.get(API + 'sub-category'),
		axios.get(API + 'post/' + params.id), 
	]).then(axios.spread((obj1, obj2, obj3) => {
		
		return {props: {
			categories: obj1.data,
			categoriesSub: obj2.data,
			movieDetail: obj3.data.data,
		}, revalidate: 60};
	}));
}


export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { id: 'the-killer' },
      },
    ],
    fallback: "blocking"
  }
}
 