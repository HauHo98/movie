import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

async function getData(query, page = 1) {

    const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    const searchMovies = await data.json();

    return { data: searchMovies.results };
}

export default async function Search({searchParams}) {
    console.log(searchParams);
    const { data } = await getData(searchParams.s, searchParams.page || '1');
    console.log(data);
    // const { searchedMovies, loader, fetchSearch } = useContext(ContextPage);

    // useEffect(() => {
    //     fetchSearch(searchParams.s);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [searchParams.s]);

    return (
        <section>
            <div className='mb-20 w-full md:mb-0 md:p-10'>
                <Header />
                {/* <motion.div
                    layout
                    className="container relative mx-auto p-4"> */}
                    <div>
                    <MovieList movies={data} />
                    </div>
                {/* </motion.div> */}
            </div>
        </section>
    )
}
