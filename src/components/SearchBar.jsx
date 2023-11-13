import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';


function SearchBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

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
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`)
      }
    }
  };

  return (
    <>
    <Helmet>
        <title>Movies</title>
    </Helmet>

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
