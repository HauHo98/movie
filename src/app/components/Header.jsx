"use client"
import React, { useContext } from 'react'
import ContextPage from '../ContextPage';

function Header() {
  const { header } = useContext(ContextPage);

  if(header === 'Trang chủ') return <></>

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