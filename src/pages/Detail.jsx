import React, { useEffect, useState, useContext, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Player from './Player';
import { nanoid } from 'nanoid';
import MovieCardRelated from '../components/MovieCardRelated.jsx';
import { FaCaretRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import ContextPage from '../Contextpage.jsx';

const API_KEY = process.env.REACT_APP_API_KEY;

const Detail = () => {
  const { loader, setLoader, fetchMovieRelated, related } = useContext(ContextPage);

  const { id } = useParams()

  const [movieDetail, setMovieDetail] = useState([]);
  const [castData, setCastData] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchMovie = async () => {
    setLoader(true)
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const movie = await data.json();
    setMovieDetail(movie);
    setGenres(movie.genres);
    fetchMovieRelated(movie.genres[0].name)
    setLoader(false);
  };

  const fetchCast = async () => {
    const castData = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language`
    );
    const castDetail = await castData.json();
    setCastData(castDetail.cast);
    setLoader(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchMovie();
    fetchCast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {movieDetail && <Helmet>
        <title>{`Movies ${movieDetail.title ? '| ' + movieDetail.title : ''}`}</title>
        <meta name='description' content={movieDetail.overview}></meta>
        <meta property="og:description" content={movieDetail.overview} />
        <meta name="keywords" content={genres.map(item => item.name).join(',')} />
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      }
      {
        loader ? <div className='flex h-screen w-full items-center justify-center'><span className="m-10 loader"></span></div> :
          <div className='container mx-auto'>
            <div className='relative flex'>
              <div className='absolute h-full w-full'></div>
              <h1 className='p-5 text-center text-2xl font-bold text-white'>{movieDetail.title}</h1>
            </div>
            <div className="px-3">
              <Player />
            </div>

            <div>
              <h2 className='px-3 pt-5 text-center text-white font-Roboto text-[18px] md:px-60'>{movieDetail.overview}</h2>
              <div className='my-3 flex justify-center font-semibold text-blue-100'>
                <h2 className='rounded-full border-2 border-blue-700 bg-blue-600/30 px-3 py-2'>Ngày phát hành : {movieDetail.release_date}</h2>
              </div>
            </div>

            <div className='flex flex-col p-4'>
              <h2 className="p-2 text-xl font-semibold">Thể loại</h2>
              <div className='flex flex-wrap gap-2'>
                {genres.map((tag) => (
                  <div key={tag.id} className='rounded-full bg-gray-800 px-4 py-1 font-semibold text-white'>{tag.name}</div>
                ))}
              </div>
            </div>

            <div className='flex flex-col p-4'>
              <h2 className="p-2 text-xl font-semibold">Diễn viên</h2>
              <div className="md:px-5 flex flex-row max-w-full flex-start overflow-x-auto relative
              scrollbar-thin scrollbar-thumb-gray-500/20 scrollbar-track-gray-900/90 md:pb-3">
                {castData.map((cast) => (
                  <Fragment key={nanoid()}>
                    {cast.profile_path !== null ? <div className='mx-1 flex h-full flex-col items-center text-center min-w-[6rem] max-w-[9rem] md:min-w-[10rem] md:max-w-[10rem]'>
                      <LazyLoadImage effect='blur' src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} className="h-full w-full" />
                      <p className='text-white'>{cast.name}</p>
                      <p className='text-amber-100'>({cast.character})</p>
                    </div> : null}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className='flex flex-col p-4'>
              <div className="flex justify-between">
                <h2 className="py-2 text-xl font-semibold">Phim cùng thể loại</h2>
                <div className='flex items-center gap-1'>Xem thêm <FaCaretRight /></div>
              </div>
              <div className="w-full md:p-2 
                           grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
                           relative 
                           gap-2 sm:gap-5
                           justify-center">
                {related &&
                  related.slice(0, 5).map((item) => (
                    <MovieCardRelated key={nanoid()} movie={item} />
                  ))}
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Detail;