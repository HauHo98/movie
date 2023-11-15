import './globals.css'
import Navbar from './components/Navbar'
import { MovieProvider } from './ContextPage'
import { useRouter } from 'next/navigation'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movies',
  description: 'Mô tả',
}

export default function RootLayout({ children }) {
    
  return (
    <html lang="en">
      <head>
      <link rel="canonical" href="ádfsadfsdf" />
      </head>
      <body>
        <MovieProvider>
        <Navbar/>
        {children}</MovieProvider></body>
    </html>
  )
}
