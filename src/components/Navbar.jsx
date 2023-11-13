import React, { useContext, useEffect } from "react";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import ContextPage from '../ContextPage.jsx';
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { MENU } from "../constants/menu";

function Navbar() {
    const { header } = useContext(ContextPage);

    return (
        <>
            <nav className={`w-full flex flex-col md:flex-col lg:flex-row justify-between px-4 md:px-8 py-4 z-40 relative items-center gap-4 sm:gap-8
            bg-gradient-to-b from-black border-b-[1px] border-gray-800
            `}>
                <div className="flex flex-col gap-4 sm:flex-row">
                <motion.div
                    className="w-[150px]"
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link to="/" className="flex items-center justify-center gap-2 logo">
                        <img src={logo} alt="logo" className="w-12" />
                        <h1 className="text-center text-2xl font-bold text-white">Movies</h1>
                    </Link>
                </motion.div>

                <ul className={`flex flex-wrap bg-transparent relative items-center gap-2
                 text-white text-[14px] text-center w-full md:w-[50%] flex-1 h-full md:h-auto`}>
                    {MENU.map((data) => (
                        <Link key={data.id} to={data.link}>
                            <li className={`${header === data.headername ? 'bg-yellow-400 text-black' : 'bg-gray-900 text-white'} 
                            p-2 hover:bg-yellow-400 hover:text-black rounded-lg `}><div
                                    className="flex items-center gap-2">{data.Name}</div></li></Link>
                    ))}

                </ul>
                </div>
                <SearchBar />
            </nav>
        </>
    )
}

export default Navbar
