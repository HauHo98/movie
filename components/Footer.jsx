"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo.png";
import {useSetRecoilState} from "recoil";
import {headerState} from "../constants/state";

function Footer() {
	const setHeader = useSetRecoilState(headerState);

	return (
		<>
			<footer className="bg-[#020713] w-full grid grid-cols-2 px-4 md:px-8 py-10 z-40 relative gap-4 sm:gap-8">
				<div>
					<div>
						<Link href="/">
							<a className="flex items-center gap-2 logo" onClick={() => {
								setHeader("Trang chủ")
							}}>
								<Image src={logo} alt="logo" className="w-12"/>
								<h1 className="text-center text-2xl font-bold text-white">Movies</h1>
							</a>
						</Link>
					</div>
					<p className="mt-4 text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a
						galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
						also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
				</div>
				<div>
					<h2 className="text-lg font-bold">Thông tin liên hệ</h2>
					<div>

					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer