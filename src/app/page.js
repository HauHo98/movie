import Head from 'next/head';
import Header from './components/Header';
import MovieList from './components/MovieList';
const API_KEY = process.env.REACT_APP_API_KEY;

async function getData(page) {
    const data = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&with_origin_country=IN&page=${page}`
    );
    const dataJson = await data.json();
    const result = dataJson.results;

    return { data: result };
}

export async function generateMetadata({ searchParams }) {
    const dataGenres = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&with_origin_country=IN&language=en-US`
    ).then(res => res.json());

    const currentPage = searchParams.page || '1'

    return {
        title: 'Movies | Trang chủ' + (currentPage !== '1' ? (' - Trang ' + currentPage) : ''),
        'og:description': 'Mô tả',
        description: 'Mô tả',
        keywords: dataGenres.genres.map(item => item.name).join(',')
    };
}

export default async function Home(page) {
    const { data } = await getData(page.searchParams.page || '1');

    return (
        <>
            <div className='w-full'>
                <Header />
                <MovieList movies={data} />
            </div>
        </>
    )
}