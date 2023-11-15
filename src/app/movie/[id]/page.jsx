"use client";
import { Fragment, Suspense, useEffect, useState } from "react";
import Player from "../../components/Player";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaCaretRight } from "react-icons/fa";
import MovieCardRelated from "../../components/MovieCardRelated";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { nanoid } from "nanoid";
import Head from "next/head";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Page({ params }) {
    const [movieDetail, setMovieDetail] = useState();
    const [castData, setCastData] = useState([]);
    const [related, setRelated] = useState([])
    useEffect(() => {
        async function getMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}&language=en-US`
            );
            const resultMovie = await data.json();
            setMovieDetail(resultMovie);

            const castData = await fetch(
                `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}&language`
            );

            const castDetail = await castData.json();
            setCastData(castDetail.cast || []);

            const dataRelated = await fetch(
                `https://api.themoviedb.org/3/discover/movie?with_genres=${resultMovie.genres[0].name}&api_key=${API_KEY}&with_origin_country=IN&page=1`
            );
            const dataJson = await dataRelated.json();
            setRelated(dataJson.results)
        }
        getMovie();
    }, [params])

    if (!movieDetail) return <div className='flex h-screen w-full items-center justify-center'><span className="m-10 loader"></span></div>


    return <Suspense fallback={<div className='flex h-screen w-full items-center justify-center'><span className="m-10 loader"></span></div>}>
         <Head>
        <title>My page title</title>
      </Head>
        <div className='container mx-auto'>
            <div className='relative flex'>
                <div className='absolute h-full w-full'></div>
                <h1 className='p-5 text-center text-2xl font-bold text-white'>{movieDetail.title}</h1>
            </div>
            <div className="px-3">
                <Player movieDetail={movieDetail} />
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
                    {movieDetail.genres.map((tag) => (
                        <div key={tag.id} className='rounded-full bg-gray-800 px-4 py-1 font-semibold text-white'>{tag.name}</div>
                    ))}
                </div>
            </div>

            {castData.length > 0 && <div className='flex flex-col p-4'>
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
            </div>}

            {related.length > 0 && <div className='flex flex-col p-4'>
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
            }
        </div>
    </Suspense>
}