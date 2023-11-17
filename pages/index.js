import Head from 'next/head'
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import {AnimatePresence, motion} from 'framer-motion';
import {useSetRecoilState} from "recoil";
import {headerState} from "../constants/state";
import {useEffect} from "react";
const API_KEY = process.env.REACT_APP_API_KEY;

export default function Home({movies}) {
  const setHeader = useSetRecoilState(headerState);

  useEffect(()=>{
    setHeader('Trang chủ')
  },[])

  return (
    <>
      <Head>
        <title>Movie | Trang chủ</title>
        <meta property="og:title" content="Movie | Trang chủ"/>
        <meta name="description" content="Movies" />
        <meta property="og:description" content="Movies"/>
        <meta property="og:type" content="website"/>
        <meta name="keywords" content="key words"/>
        <meta property="url" content={process.env.NEXT_PUBLIC_APP_SITE}/>
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_SITE}/>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_SITE}/>
      </Head>

      <div className='w-full'>
        <Header />
        <motion.div
          layout
          className="container relative mx-auto p-4">
          <AnimatePresence>
            <>
              <Header />
              <MovieList movies={movies} />
            </>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  console.log(context.query)
  const page = '1'
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&with_origin_country=IN&page=${page}`
  );
  const dataJson = await data.json();
  const result = dataJson.results;

  return { props: { movies: result } }
}