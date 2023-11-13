import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { MovieProvider } from "./ContextPage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import logo from "./assets/images/logo.png"
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';

function App() {

  return (
    <MovieProvider>
      <Helmet>
        <meta name="charset" content="utf-8"/>
       <meta property="og:image" content={logo}/>
       <meta name="og:locale" content="vi_VN"/>
       <meta name="keywords" content="Phim,Phim hay,Phim vietsub, Phim hành động, Phim hài"/>
      </Helmet>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar />
      <div>
        <Routes>
          <Route path='/movie/:id' element={<Detail />} />
          <Route path='/:category' element={<Home />} />
          <Route path='/' element={<Home />} />
          {/* <Route path='/genres' element={<Container />} />
          <Route path='/upcoming' element={<Upcoming />} />
          
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/player/:id/:title" element={<Player />} /> 
          <Route path="/player/:id" element={<Player />} />  */}
          <Route path="/search/:query" element={<Search/>}/>
          <Route path="/search/" element={<Search/>}/>
        </Routes>
      </div>
    </MovieProvider>
  )
}

export default App
