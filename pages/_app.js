import '../styles/globals.css'
import Head from "next/head";
import Navbar from "../components/Navbar";
import {RecoilRoot} from "recoil";
import Footer from "../components/Footer";
import Category from "../components/Category";

const API = process.env.NEXT_PUBLIC_API;

function MyApp({Component, pageProps}) {
	return <RecoilRoot>
		<Head>
			<meta charSet="utf8"/>
			<title>Movies</title>
			<link rel="icon" href="/favicon.ico"/>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
		</Head>
		<main>
			<Navbar categories={pageProps.categories}/>
			<Component {...pageProps} />
			<Category categories={pageProps.categories} subCategories={pageProps.categoriesSub}/>
			<Footer/>
		</main>
	</RecoilRoot>
}

export default MyApp


MyApp.getInitialProps = async () => {
	let pageProps = {};
	const dataCate = await fetch(API + 'category');
	const dataCateJson = await dataCate.json();

	const dataCateSub = await fetch(API + 'sub-category');
	const dataCateSubJson = await dataCateSub.json();

	pageProps["categories"] = dataCateJson;
	pageProps["categoriesSub"] = dataCateSubJson;
	const dataMoviesFirstCate = await fetch(API + 'posts-category/' + dataCateJson[0].slug);
	pageProps["homeData"] = await dataMoviesFirstCate.json()

	return {pageProps};
};
