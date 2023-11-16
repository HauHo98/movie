"use client";
import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import ContextPage from '../ContextPage';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Search({ searchParams }) {
    const { movies, setMovies, setLoader, loader } = useContext(ContextPage);

    useEffect(() => {
        async function getData() {
            setLoader(true);
            const data = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${searchParams.s}&page=${searchParams.page || '1'}&include_adult=false`
            );
            const dataJson = await data.json();
            console.log(dataJson);
            setMovies(dataJson.results || []);
            setLoader(false);
        }
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <section>
            <div className='mb-20 w-full md:mb-0 md:p-10'>
                <Header />
                <motion.div
                    layout
                    className="container relative mx-auto p-4">
                    <AnimatePresence>
                        {   loader ? 
                            <div className="flex items-center justify-normal"> <span className="mx-auto loader"></span> </div> : 
                            movies.length > 0 ? 
                            <MovieList movies={movies} /> : 
                            <div className="text-center text-xl"><p>Không tìm thấy phim</p></div>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}
