// "use client"
// import { createContext, useState, useEffect } from "react";
// import { useRouter } from 'next/navigation'
// const ContextPage = createContext();
// const API_KEY = process.env.REACT_APP_API_KEY;
//
// export function MovieProvider({ children }) {
//   const [header, setHeader] = useState("Trang chủ");
//   const [movies, setMovies] = useState([]);
//   const [related, setRelated] = useState([]);
//   const [searchedMovies, setSearchedMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [genres, setGenres] = useState([])
//   const [loader, setLoader] = useState(true);
//   const router = useRouter();
//
//   useEffect(() => {
//     console.log(window.location)
//     if (page < 1) {
//       setPage(1)  // Increment page to 1 if it is less than 1.
//     }
//
//     if(window.location.pathname === '/search'){
//       setHeader("")
//       console.log('ádjkdasjh')
//       router.push('/search' + window.location.search)
//     }
//   }, [page]);
//
//   const fetchMovieByCate = async (category) => {
//     let data;
//     if (category) {
//       data = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?with_genres=${category}&api_key=${API_KEY}&with_origin_country=IN&page=${page}`
//       );
//     } else {
//       data = await fetch(
//         `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&with_origin_country=IN&page=${page}`
//       );
//     }
//
//     const dataJson = await data.json();
//     setMovies(dataJson.results)
//     setLoader(false);
//   }
//
//   const fetchMovieRelated = async (categoryRelated) => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/discover/movie?with_genres=${categoryRelated}&api_key=${API_KEY}&with_origin_country=IN&page=${page}`
//     );
//
//     const dataJson = await data.json();
//     setRelated(dataJson.results)
//   }
//
//   const fetchSearch = async (query) => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${query}&page=1&include_adult=false`
//     );
//     const searchMovies = await data.json();
//     setSearchedMovies(searchMovies.results);
//     setLoader(false);
//     setHeader(`Kết quả tìm kiếm: "${query}"`);
//   }
//
//   const fetchGenre = async () => {
//     const data = await fetch(
//       `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&with_origin_country=IN&language=en-US`
//     );
//     const genRes = await data.json();
//     setGenres(genres.concat(genRes.genres));
//   }
//
//   return (
//     <ContextPage.Provider
//       value={{
//         fetchMovieByCate,
//         fetchMovieRelated,
//         related,
//         fetchGenre,
//         genres,
//         setGenres,
//         header,
//         setHeader,
//         movies,
//         setMovies,
//         page,
//         setPage,
//         fetchSearch,
//         loader,
//         setLoader,
//         searchedMovies
//       }}
//     >
//       {children}
//     </ContextPage.Provider>
//   );
//
// }
//
// export default ContextPage
