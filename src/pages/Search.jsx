import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import MovieCard from '../components/MovieCard.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
// import { Pagebtn } from '../components/Pagebtn';
import { Link, useParams } from 'react-router-dom'
import { HiChevronLeft } from "react-icons/hi";
import { nanoid } from 'nanoid';


function Search() {

    const { searchedMovies, loader, page, setPage, totalPage, setMovies, activegenre, filteredGenre, fetchSearch } = useContext(Contextpage);
    const { query } = useParams()

    useEffect(() => {
        // Call fetchSearch(query) only once when the component mounts
        fetchSearch(query);
    }, [query]); // Only re-run if 'query' or 'fetchSearch' changes

    return (
        <section>
            <div className='w-full  md:p-10 mb-20 md:mb-0'>
                <Header />
                <motion.div
                    layout
                    className="flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                        {searchedMovies.map((movie) => (
                                            <MovieCard key={nanoid()} movie={movie} />
                                        ))}
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>

    )
}

export default Search


//   `https://api.themoviedb.org/3/trending/all/day?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&page=${page}`