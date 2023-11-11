import React, { useEffect, useContext } from 'react'
import {nanoid} from "nanoid";
import Contextpage from '../Contextpage';
import { motion, AnimatePresence } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard.jsx';
import Header from '../components/Header';
import HeroMovies from '../components/HeroMovies.jsx';


function Home() {

    const { fetchTrending, loader, page, setPage, totalPage, setTrending, trending } = useContext(Contextpage);

    useEffect(() => {
        setPage(1) // Reset Page to 1 on initial render.
        fetchTrending();
    }, []);
    
    // useEffect(() => {
    //     setMovies([])  // Reset movies on genre change so that movies of other genre will not appear at top.
    //     setPage(0)
    //     /* Set page to 0, it will automatically increment to 1 and will cause re render even if the page is already set to 1. The increment function is in context page.
    //     It is important to set page to 0, as on changing genre, if page is already set to 1 then the fetch function will not work as the page state variable is not changed, that's why we are setting page to 0 to force re-render. 
    //     */
    // }, [activegenre]);

    // useEffect(() => {
    //     console.log(trending);
    //   console.log(page)
    //     if (page > 0) {
    //         fetchTrending();
    //     }
    // }, [page])

    return (
        // md:p-10
        <div className='w-full   mb-20 md:mb-0'> 
            <motion.div
                    layout
                    className="flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                            <HeroMovies key={trending[0].id} movie={trending[0]} />
                        }
                    </AnimatePresence>
                </motion.div>
            {/* <Genre /> */}
            <Header />
            <motion.div
                layout
                className="flex flex-wrap relative justify-evenly md:justify-around">
                <AnimatePresence>
                    {
                        loader ? <span className="loader m-10"></span> :
                            <>
                                {/* {console.log(movies.length)} */}
                                <InfiniteScroll
                                    className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                                    dataLength={trending.length} //This is important field to render the next data
                                    next={() => setPage(page + 1)}
                                    hasMore={page < totalPage}
                                    loader={<span className="loader m-10"></span>}
                                    scrollThreshol={0.9}
                                    style={{ overflow: 'hidden' }}
                                >

                                    {trending.map((trd) => (
                                        <MovieCard key={nanoid()} movie={trd} />
                                    ))}

                                </InfiniteScroll>

                            </>
                    }
                </AnimatePresence>
            </motion.div>
            {/* <Pagebtn /> */}

        </div>
    )
}

export default Home;