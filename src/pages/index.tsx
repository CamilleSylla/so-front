import Image from 'next/image'
import { Inter } from 'next/font/google'
import HomeHeroBanner from '@/components/HomeHeroBanner'
import FeaturedProduct from '@/components/FeaturedProduct'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <HomeHeroBanner/>
      <FeaturedProduct/>
    </main>
  )
}
