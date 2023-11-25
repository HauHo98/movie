import Head from 'next/head'
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import {useRecoilValue} from "recoil";
import {headerState} from "../constants/state";
import {useRouter} from "next/router";

const API = process.env.NEXT_PUBLIC_API;

export default function Category({data}) {
	const header = useRecoilValue(headerState);
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Movie | {header}</title>
				<meta property="og:title" content={`Movie | ${header}`}/>
				<meta name="description" content={`Movies detail ${header}`}/>
				<meta property="og:description" content={`Movies detail ${header}`}/>
				<meta property="og:type" content="website"/>
				<meta name="keywords" content="key words"/>
				<meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE + '/' + router.query.id}/>
				<meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE + '/' + router.query.id}/>
				<link rel="canonical" href={process.env.NEXT_PUBLIC_APP_SITE + '/' + router.query.id}/>
			</Head>
			<div className='w-full'>
				<Header/>
				<MovieList movies={data}/>
			</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const {page} = context.query;
	const {id} = context.params;

	const data = await fetch(API + 'posts-category/' + id + '?page=' + page || '1');
	const dataJson = await data.json();

	return {props: {data: dataJson}}
}