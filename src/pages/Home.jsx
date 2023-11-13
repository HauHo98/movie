import React, { useEffect, useContext, useState } from 'react'
import ContextPage from '../ContextPage.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import MovieList from '../components/MovieList.jsx'; import { useParams } from 'react-router-dom';
import { MENU } from '../constants/menu.js';
import Header from '../components/Header.jsx';
import { Helmet } from 'react-helmet';

function Home() {
    const { category } = useParams();
    const { genres, fetchGenre, fetchMovieByCate, movies, loader, setPage, setHeader, header, page } = useContext(ContextPage);

    useEffect(() => {
        setPage(1) // Reset Page to 1 on initial render.
        fetchGenre()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (category) {
            const menuItem = MENU.find(item => item.link.endsWith(category));
            menuItem && setHeader(menuItem.headername)
            fetchMovieByCate('Comedy');
        } else {
            setHeader("Trang chủ");
            fetchMovieByCate();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])

    return (
        <>
            <Helmet>
                <title>Movies | {header} {page && header !== 'Trang chủ' ? ' - Trang ' + page : ''}</title>
                <meta name='description' content='Mô tả'></meta>
                <meta property="og:description" content="Mô tả" />
                <meta name="keywords" content={genres.map(item => item.name).join(',')} />
                <link rel="canonical" href={window.location.href} />
                <meta property="url" content={window.location.href} />
                <meta property="og:url" content={window.location.href} />
            </Helmet>
            <div className='mb-20 w-full md:mb-0'>
                <motion.div
                    layout
                    className="container relative mx-auto px-4 pt-4 pb-10 md:pt-10 md:pb-24">
                    <AnimatePresence>
                        {
                            loader ? <span className="m-10 loader"></span> :
                                <>
                                    <Header />
                                    <MovieList movies={movies} /></>
                        }
                    </AnimatePresence>
                </motion.div>

            </div>
        </>
    )
}

export default Home;