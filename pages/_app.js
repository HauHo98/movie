import '../styles/globals.css'
import Head from "next/head";
import Navbar from "../components/Navbar";
import {RecoilRoot} from "recoil";
import Footer from "../components/Footer";
import Category from "../components/Category";

function MyApp({Component, pageProps}) {
	return <RecoilRoot>
		<Head>
			<meta charSet="utf8"/>
			<title>Movies</title>
			<link rel="icon" href="/favicon.ico"/>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
		</Head>
		<main>
			{pageProps.categories && <Navbar categories={pageProps.categories}/>}
			<Component {...pageProps} />
			{pageProps.categories && pageProps.categoriesSub && <Category categories={pageProps.categories} subCategories={pageProps.categoriesSub}/>}
			<Footer/>
		</main>
	</RecoilRoot>
}

export default MyApp
