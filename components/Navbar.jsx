"use client"
import React, { useEffect } from "react";
import logo from "../assets/images/logo.png"
import Image from 'next/image';
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import { nanoid } from "nanoid";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { headerState, loaderState, searchState } from "../constants/state";
import { useRouter } from "next/router";

function Navbar({ categories }) {
	const [header, setHeader] = useRecoilState(headerState);
	const setLoader = useSetRecoilState(loaderState);
	const setSearch = useSetRecoilState(searchState);
	const router = useRouter();

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setLoader(true)
			if (router.pathname !== '/search') {
				const itemFind = categories.find(item => item.slug === router.query.id);
				setSearch("")
				setHeader(itemFind ? itemFind.name : 'Trang chủ')
			}
		})
		router.events.on('routeChangeComplete', () => {
			setLoader(false)
		})
		return () => {
			router.events.off('routeChangeComplete', () => {
				setLoader(false)
			})
		};
	}, [router.events]);

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
						<div>
							<Link href="/">
								<a className="flex items-center justify-center gap-2 logo" onClick={() => {
									setHeader("Trang chủ")
								}}>
									<Image src={logo} alt="logo" className="w-12" />
									<h1 className="text-center text-2xl font-bold text-white">Movies</h1>
								</a>
							</Link>
						</div>
					</motion.div>

					<ul className={`flex flex-wrap bg-transparent relative items-center gap-2
                 text-white text-[14px] text-center w-full md:w-[50%] flex-1 h-full md:h-auto`}>
						{categories.map((data) => {
							return header === data.name ? <li key={nanoid()} className={`${header === data.name ? 'bg-yellow-400 text-black' : 'bg-gray-900 text-white'} 
							p-2 hover:bg-yellow-400 hover:text-black rounded-lg cursor-pointer`}>
								<div
									className="flex items-center gap-2">{data.name}</div>
							</li>
								:
								<Link href={`/${data.slug}`} key={nanoid()}>
									<a
										onClick={() => {
											setHeader(data.name);
											setLoader(true)
										}}>
										<li className={`${header === data.name ? 'bg-yellow-400 text-black' : 'bg-gray-900 text-white'} 
													p-2 hover:bg-yellow-400 hover:text-black rounded-lg cursor-pointer`}>
											<div
												className="flex items-center gap-2">{data.name}</div>
										</li>
									</a>
								</Link>
						})}
					</ul>
				</div>
				<SearchBar />
			</nav>
		</>
	)
}

export default Navbar
