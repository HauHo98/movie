import React, { useState, useContext } from "react";
import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { motion } from "framer-motion";
import { FaAlignRight, FaHome, FaRegWindowClose } from "react-icons/fa";
import Searchbar from "./Searchbar";

function Navbar() {

    const { header } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const Navdata = [

        {
            id: 1,
            headername: "Trang chủ",
            Name: <><FaHome /> Trang chủ</>,
            link: "/"
        },
        {
            id: 2,
            headername: "Phim hay",
            Name: "Phim hay",
            link: "/phim-hay"
        },
        {
            id: 3,
            headername: "Phim Vietsub",
            Name: "Phim Vietsub",
            link: "/phim-vietsub"
        },
        {
            id: 4,
            headername: "Phim hành động",
            Name: "Phim hành động",
            link: "/phim-hanh-dong"
        },
        {
            id: 5,
            headername: "Phim kiếm hiệp",
            Name: "Phim kiếm hiệp",
            link: "/phim-kiem-hiep"
        },
        {
            id: 6,
            headername: "Phim hoạt hình",
            Name: "Phim hoạt hình",
            link: "/phim-hoat-hinh"
        },
        {
            id: 7,
            headername: "Phim quyết đấu",
            Name: "Phim quyết đấu",
            link: "/phim-quyet-dau"
        },
        // {
        //     id: 2,
        //     headername: "Upcoming Movies",
        //     Name: "Upcoming",
        //     link:"/upcoming"
        // },
        // {
        //     id: 3,
        //     headername: "Favorite Movies",
        //     Name: "Favorites",
        //     link:"/favorite"
        // }
    ]

    return (
        <>
            {/* mobilebutton */}
            <nav className={` w-full flex flex-row justify-between px-8 py-2 z-40 relative items-start
            bg-gradient-to-b from-black
            `}>
                <motion.div
                    className="w-[150px]"
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link to="/" className="logo flex justify-center items-center gap-2" onClick={() => setActivemobile(!activemobile)}>
                        <img src={logo} alt="logo" className="w-12" />
                        <h1 className="text-white font-bold text-2xl text-center">Movies</h1>
                    </Link>
                </motion.div>

                <ul className={`flex flex-wrap bg-transparent relativeo
                 text-white text-[14px] text-center px-5 w-full md:w-[50%] flex-1 h-full md:h-auto`}>
                    {Navdata.map((data) => (
                        <Link key={data.id} to={data.link}>
                            <li className={`${header == data.headername ? 'bg-red_cus text-white' : 'bg-gray-900 text-white'} 
                            p-2 mx-2 mb-2 hover:text-white rounded-lg`} onClick={() => {
                                    setShowMenu(false);
                                    setActivemobile(!activemobile)
                                }}><div
                                    className="flex gap-2 items-center">{data.Name}</div></li></Link>
                    ))}

                </ul>
                <Searchbar />
            </nav>
        </>
    )
}

export default Navbar
