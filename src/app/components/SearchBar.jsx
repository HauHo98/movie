"use client"
import React, { useState } from 'react'
import Head from 'next/head';
import slugify from 'react-slugify';
import { useRouter } from 'next/navigation'

function SearchBar() {
  const [value, setValue] = useState("");
  const router = useRouter()

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
      if (typingTimeout) {
          clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(() => {
          onKeyUp(value);
      }, 500); 
      setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    if (query !== "") {
        query = query.trim();

      if (query === "") {
        router.push("/");
      } else {

        router.push(`/search?s=${slugify(query)}`)
      }
    }
  };

  return (
    <>
    <Head>
        <title>Movies</title>
    </Head>

    <div className='flex h-full w-full items-center justify-center md:w-full lg:max-w-[350px]'>
        <input
          type="search"
          name="searchpanel"
          id="searchpanel"
          placeholder='Nhập tên phim cần tìm kiếm ...'
          className='h-10 w-full rounded-xl bg-slate-600 p-3 outline-none'
          onKeyUp={(e) => handleSearch()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      </>
  )
}

export default SearchBar
