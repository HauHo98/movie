import React, { useEffect, useContext } from 'react'
import ContextPage from '../ContextPage.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import { useParams } from 'react-router-dom'
import MovieList from '../components/MovieList.jsx';

function Search() {
    const { searchedMovies, loader, fetchSearch } = useContext(ContextPage);
    const { query } = useParams()

    useEffect(() => {
        fetchSearch(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <section>
            <div className='mb-20 w-full md:mb-0 md:p-10'>
                <Header />
                <motion.div
                    layout
                    className="container relative mx-auto p-4">
                    <AnimatePresence>
                        {
                            loader ? <span className="m-10 loader"></span> :
                                <MovieList movies={searchedMovies} />
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

export default Search