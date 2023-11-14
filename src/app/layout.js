import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { MovieProvider } from './ContextPage'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movies',
  description: 'Mô tả',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MovieProvider>
        <Navbar/>
        {children}</MovieProvider></body>
    </html>
  )
}
