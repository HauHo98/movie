import '../styles/globals.css'
import Head from "next/head";
import Navbar from "../components/Navbar";
import {RecoilRoot} from "recoil";

function MyApp({ Component, pageProps }) {
  return <RecoilRoot>
    <Head>
      <meta charSet="utf8" />
      <title>Movies</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
    </Head>
    <main>
      <Navbar/>
      <Component {...pageProps} />
    </main>
  </RecoilRoot>
}

export default MyApp
