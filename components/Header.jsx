"use client"
import React from 'react'
import {useRecoilValue} from "recoil";
import {headerState} from "../constants/state";

function Header() {
	const header = useRecoilValue(headerState);

	if (header === 'Trang chủ') return <></>

	return (
		<>
			<header className={`flex items-center justify-center
      text-xl md:text-3xl font-bold px-5 pt-5 md:px-10 md:pt-10`}>
				{header}
			</header>
		</>
	)
}

export default Header