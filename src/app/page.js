
import Head from 'next/head';
import Header from './components/Header';
import MovieList from './components/MovieList';
const API_KEY = process.env.REACT_APP_API_KEY;

async function getData(page = 1) {
    const data = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&with_origin_country=IN&page=${page}`
      );
      const dataJson = await data.json();
      const result = dataJson.results;

    return {data: result};
  }

export async function generateMetadata() {
    const dataGenres = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&with_origin_country=IN&language=en-US`
        ).then(res => res.json());

    console.log('-----');
    console.log(dataGenres);
    return {
        title: 'Movies | Trang chủ',
       'og:description': 'Mô tả',
        description: 'Mô tả',
        keywords: dataGenres.genres.map(item => item.name).join(','),
        canonical: process.env.REACT_APP_SITE,
        url: process.env.REACT_APP_SITE,
        'og:url': process.env.REACT_APP_SITE
    };
    }

export default async function Home() {
    const {data} = await getData();
  // const { category } = useParams();
  // const { genres, fetchGenre, fetchMovieByCate, movies, loader, setPage, setHeader, header, page } = useContext(ContextPage);

  // useEffect(() => {
      // setPage(1) // Reset Page to 1 on initial render.
      // fetchGenre()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
      // if (category) {
      //     const menuItem = MENU.find(item => item.link.endsWith(category));
      //     menuItem && setHeader(menuItem.headername)
      //     fetchMovieByCate('Comedy');
      // } else {
      //     setHeader("Trang chủ");
      //     fetchMovieByCate();
      // }
      // setHeader("Trang chủ");
      // fetchMovieByCate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category])

  return (
   <>
   <Head>
    <link rel="canonical" href="ádfsadfsdf"/>
   </Head>
    <div className='mb-20 w-full md:mb-0'>
    <Header />
     <MovieList movies={data} />
  </div></>
  )
}