import React, { useEffect, useContext, useState } from 'react'
import {nanoid} from "nanoid";
import Contextpage from '../Contextpage';
import { motion, AnimatePresence } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../components/MovieCard.jsx';
import Header from '../components/Header';
import HeroMovies from '../components/HeroMovies.jsx';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const itemsPerPage = 10;

function Home() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const { fetchTrending, loader, page, setPage, totalPage, setTrending, trending } = useContext(Contextpage);

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = trending.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        setPage(1) // Reset Page to 1 on initial render.
        fetchTrending();
    }, []);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
      };

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
            {/* <Header /> */}
            <motion.div
                layout
                className="flex flex-wrap relative justify-evenly md:justify-around">
                <AnimatePresence>
                    {
                        loader ? <span className="loader m-10"></span> :
                            <>
                           <div className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                           {currentItems &&
                                currentItems.map((item) => (
                                    <MovieCard key={nanoid()} movie={item} />
                                ))}
                           </div>
                            <ReactPaginate
                              breakLabel="..."
                              nextLabel={<div className="flex items-center gap-2">Next <FaArrowRight/></div>}
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={5}
                              pageCount={pageCount}
                              previousLabel={<div className="flex items-center gap-2"><FaArrowLeft/> Prev</div>}
                              renderOnZeroPageCount={null}
                              className="flex p-20 mb-24"
                              activeClassName='bg-yellow-400'
                              previousClassName='flex mr-2 items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
                              nextClassName='flex ml-2 items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
                              pageClassName='flex items-center justify-center p-2 mx-2 bg-white text-slate-700 w-10 h-10 rounded-full'
                              disabledClassName='bg-gray-500'
                            />
                                {/* {console.log(movies.length)} */}
                                {/* <InfiniteScroll
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

                                </InfiniteScroll> */}

                            </>
                    }
                </AnimatePresence>
            </motion.div>
            {/* <Pagebtn /> */}

        </div>
    )
}

export default Home;