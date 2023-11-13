import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header';
import ContextPage from '../ContextPage.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

function Favoritepage() {

    const { loader, GetFavorite } = useContext(ContextPage);
    const [localStorageData, setLocalStorageData] = useState([]);

    useEffect(() => {
        GetFavorite();

        const data = localStorage;
        setLocalStorageData(data);
    }, []);

    return (
        <>
          <Helmet>
            <title>Movies | Favorite Movies</title>
          </Helmet>
            
            <div className='mb-20 w-full md:mb-0 md:p-10'>
                <Header />
                <motion.div
                    layout
                    className="relative flex w-full flex-wrap justify-evenly md:justify-around md:p-2">
                    <AnimatePresence>
                        {
                            loader ? <span className="m-10 loader"></span> :
                                <>
                                    {
                                        Object.keys(localStorageData).filter(key => !isNaN(key)).length == 0
                                            ?
                                            <p className="text-xl text-white">Chưa có dấu trang nào!</p>
                                            :
                                            Object.keys(localStorageData).filter(key => !isNaN(key)).map((key, index) => (<MovieCard key={index} movie={{ ...JSON.parse(localStorageData[key]) }} />))
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default Favoritepage