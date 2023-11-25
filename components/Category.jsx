"use client"
import React, {useEffect} from 'react'
import Link from "next/link";
import {useRecoilState, useSetRecoilState} from "recoil";
import {headerState, loaderState, searchState} from "../constants/state";
import {useRouter} from "next/router";

function Category({categories, subCategories}) {
	const setLoader = useSetRecoilState(loaderState);
	const [header, setHeader] = useRecoilState(headerState);
	const setSearch = useSetRecoilState(searchState);
	const router = useRouter();

	useEffect(() => {
		if (router.pathname !== '/search') {
			const itemFind = categories.find(item => item.slug === router.query.id) || subCategories.find(item => item.slug === router.query.id);
			setSearch("")
			setHeader(itemFind ? itemFind.name : 'Trang chủ')
		}
	}, [router])

	useEffect(() => {
		router.events.on('routeChangeStart', () => {
			setLoader(true);
			window.scrollTo(0, 0)
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
			<section className="bg-[#181e30] w-full  px-4 md:px-8 py-10 z-40 relative mt-10 gap-4 sm:gap-8">
				<div className="flex gap-2 justify-center">
					{categories.map((item, index) => <Link key={'cate-' + index} href={`/${item.slug}`}><a
						className={`px-4 py-2 rounded-full hover:bg-gray-700 
					 ${header === item.name ? 'bg-yellow-400 text-black' : 'bg-gray-500'} `}> {item.name}</a></Link>)}
				</div>
				<div className="flex gap-2 mt-4 justify-center">
					{subCategories.map((item, index) => <Link key={'cate-' + index} href={`/${item.slug}`}><a
						className={`px-4 py-2 rounded-full hover:bg-gray-700  ${header === item.name ? 'bg-yellow-400 text-black' : 'bg-gray-500'} `}> {item.name}</a></Link>)}
				</div>
			</section>
		</>
	)
}

export default Category