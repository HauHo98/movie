import { createContext, useState, useEffect } from "react";

const Contextpage = createContext();

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);

  const APIKEY = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    if (page < 1) {
      setPage(1)  // Increment page to 1 if it is less than 1.
    }
  }, [page]);


  const filteredGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&with_origin_country=IN&page=${page}`
    );
    const filteredGenre = await data.json();
    setMovies(movies.concat(filteredGenre.results)); // Concat new movies with previous movies, on genre change movies are reset to [] so that only movies of new genre will appear, check out useEffect on top for more information.
    setTotalPage(filteredGenre.total_pages);
    setLoader(false);
    setHeader("Genres");
  };

  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&with_origin_country=IN&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results); 
    setLoader(false);
    setHeader(`Results for "${query}"`);
  }

  const fetchGenre = async () => {
    // const data = await fetch(
    //   `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&with_origin_country=IN&language=en-US`
    // );
    // const gen = await data.json();
    // setGenres(gen.genres);
    // setLoader(false);

    // setMovies(movies.concat(filteredGenre.results)); // Concat new movies with previous movies, on genre change movies are reset to [] so that only movies of new genre will appear, check out useEffect on top for more information.
    // setTotalPage(filteredGenre.total_pages);
    // setLoader(false);
    // setHeader("Genres");

    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&with_origin_country=IN&language=en-US`
    );
    const genRes = await data.json();
    setGenreList(genreList.concat(genRes.results));
    setTotalPage(genRes.total_pages);
    setLoader(false);
    setHeader("Genres Movies");
  }

  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&with_origin_country=IN&page=${page}`
    );
    const trend = await data.json();
    setTrending(trending.concat(trend.results));
    setTotalPage(trend.total_pages);
    setLoader(false);
    setHeader("Trending Movies");
  }

  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&with_origin_country=IN&language=en-US&page=${page}`
    );
    const upc = await data.json();
    setUpcoming(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoader(false);
    setHeader("Upcoming Movies");
  }

  // creat local storage
  const GetFavorite = () => {
    setLoader(false);
    setHeader("Favorite Movies");
  }

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        setTrending,
        upcoming,
        GetFavorite,
        totalPage,
        searchedMovies
      }}
    >
      {children}
    </Contextpage.Provider>
  );

}

export default Contextpage
