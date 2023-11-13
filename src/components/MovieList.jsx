import { nanoid } from "nanoid";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import MovieCard from "./MovieCard";

const itemsPerPage = 10;

function MovieList(props) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = props.movies.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(props.movies.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.movies.length;
    setItemOffset(newOffset);
  };

  return <>
    <div className="w-full md:p-2
      grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
      relative 
      gap-2 sm:gap-5
      justify-center"
    >
      {currentItems &&
        currentItems.map((item) => (
          <MovieCard key={nanoid()} movie={item} />
        ))}
    </div>
    {pageCount > 1 && <ReactPaginate
      breakLabel="..."
      nextLabel={<div className="flex items-center gap-2">Next <FaArrowRight /></div>}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel={<div className="flex items-center gap-2"><FaArrowLeft /> Prev</div>}
      renderOnZeroPageCount={null}
      className="my-10 flex flex-wrap justify-center gap-2 md:my-24 md:p-4 md:p-20"
      activeClassName='bg-yellow-400'
      disabledClassName='bg-zinc-800'
      previousClassName='flex items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
      nextClassName='flex items-center justify-center p-2 px-4 bg-white text-slate-700 h-10 rounded-full'
      pageClassName='flex items-center justify-center p-2 bg-white text-slate-700 w-10 h-10 rounded-full'
    />}
  </>
}
export default MovieList;