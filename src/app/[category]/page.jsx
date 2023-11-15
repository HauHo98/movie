import Head from 'next/head';
import { useContext } from 'react';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import { MENU } from '../constants/menu';
import ContextPage from '../ContextPage';
const API_KEY = process.env.REACT_APP_API_KEY;

async function getData(category, page = 1) {

    const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=${API_KEY}&with_origin_country=IN&page=${page}`
    );
    const dataJson = await data.json();
    const result = dataJson.results;

    return { data: result };
}

export async function generateMetadata(data) {
    const currentPage = data.searchParams.page || '1';
    const itemFind = MENU.find(item => item.link.endsWith(data.params.category));
    const headerName = itemFind ? itemFind.headername : ''

    return {
        title: 'Movies' + (headerName && ' | ' + headerName) + (currentPage !== '1' ? (' - Trang ' + currentPage) : ''),
        'og:description': 'Mô tả',
        description: 'Mô tả',
        // keywords: dataGenres.genres.map(item => item.name).join(','),
    };
}

export default async function Page({ params, searchParams }) {
    console.log(params);
    const { data } = await getData(params.category, searchParams.page || '1');

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
                <link rel="canonical" href="ádfsadfsdf" />
            </Head>
            <div className='w-full'>
                <Header />
                <MovieList movies={data} />
            </div></>
    )
}