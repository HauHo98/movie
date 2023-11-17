"use client"
import React, { useState } from 'react'
import slugify from 'react-slugify';
import {useRouter} from "next/router";
import {useRecoilState, useSetRecoilState} from "recoil";
import {headerState, searchState} from "../constants/state";

function SearchBar() {
 const setHeader = useSetRecoilState(headerState);
  const [search, setSearch] = useRecoilState(searchState);
  const router = useRouter()

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
      if (typingTimeout) {
          clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(() => {
          onKeyUp(search);
      }, 500); 
      setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    if (query === "") {
      setHeader("Trang chủ");
      router.push("/");
    } else {
      setHeader("Kết quả tìm kiếm : " +  search)
      router.push(`/search?s=${slugify(query)}`)
    }
  };

  return (
    <>
    {/*<Head>*/}
    {/*    <title>Movies</title>*/}
    {/*</Head>*/}

    <div className='flex h-full w-full items-center justify-center md:w-full lg:max-w-[350px]'>
        <input
          type="search"
          name="searchpanel"
          id="searchpanel"
          placeholder='Nhập tên phim cần tìm kiếm ...'
          className='h-10 w-full rounded-xl bg-slate-600 p-3 outline-none'
          onKeyUp={(e) => handleSearch()}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      </>
  )
}

export default SearchBar
