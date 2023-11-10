import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import Contextpage from '../Contextpage';
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';


function Searchbar() {

  const { filteredGenre, fetchSearch, setBackGenre, setGenres } = useContext(Contextpage);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
      // Clear the previous timeout to prevent premature execution
      if (typingTimeout) {
          clearTimeout(typingTimeout);
      }

      // Set a new timeout
      const newTimeout = setTimeout(() => {
          onKeyUp(value);
      }, 500); // Adjust the timeout duration as needed (in milliseconds)

      setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    // console.log(query)
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

    <div className='w-full md:max-w-[300px] h-full flex justify-center items-center my-4'>
        <input
          type="search"
          name="searchpanel"
          id="searchpanel"
          placeholder='Search Movie'
          className='md:bg-transparent p-3 h-10 w-full md:mx-10 md:w-[40rem] rounded-xl outline-none focus:bg-slate-600'
          onKeyUp={(e) => handleSearch()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      </>
  )
}

export default Searchbar