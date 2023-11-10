import React, { useState, useContext } from "react";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { motion } from "framer-motion";
import { FaAlignRight, FaRegWindowClose } from "react-icons/fa";
import Searchbar from "./Searchbar";

function Navbar() {

    const { header, } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const Navdata = [
        {
            id: 1,
            headername: "Genres",
            Name: "Genres",
            link : "/"
        },
        {
            id: 2,
            headername: "Trending Movies",
            Name: "Trending",
            link:"/trending"
        },
        {
            id: 3,
            headername: "Upcoming Movies",
            Name: "Upcoming",
            link:"/upcoming"
        },
        {
            id: 4,
            headername: "Favorite Movies",
            Name: "Favorites",
            link:"/favorite"
        }
    ]

    return (
        <>
            {/* mobilebutton */}
            <nav className={` w-full flex flex-col md:flex-row md:justify-between px-8 py-2 z-40 relative items-center
            bg-gradient-to-b from-black
            `}>
                <div className="flex md:flex-row justify-between items-center w-full md:w-auto">
                <motion.div
                    className="w-[150px]"
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4  }}
                >
                    <Link to="/" className="logo flex justify-center items-center gap-2" onClick={() => setActivemobile(!activemobile)}>
                        <img src={logo} alt="logo" className="w-12" />
                        <h1 className="text-white font-bold text-2xl text-center">Movies</h1>
                    </Link>
                </motion.div>
                <div onClick={()=> setShowMenu(!showMenu)}
                className="md:hidden text-white text-3xl">{!showMenu ? <FaAlignRight/> : <FaRegWindowClose/>}</div>
                


                <ul className={`${showMenu ? 'block' : 'hidden'} md:flex bg-black md:bg-transparent fixed md:relative left-0 md:left-auto  top-[56px] md:top-auto
                 text-white font-semibold text-[20px] md:text-[16px] text-center px-5 w-full md:w-[50%] flex-1 h-full md:h-auto`}>
                    {Navdata.map((data) => (
                            <Link key={data.id} to={data.link}><li className={`${header == data.headername ? ' text-yellow-400 md:text-white' : 'text-slate-500'} 
                            py-2 px-5 my-2  hover:text-white`} onClick={() => {
                                setShowMenu(false);
                                setActivemobile(!activemobile)
                            }}>{data.Name}</li></Link>
                    ))}

                </ul>
                </div>
                 <Searchbar />
            </nav>
        </>
    )
}

export default Navbar
