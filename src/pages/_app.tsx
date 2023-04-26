import Nav from '@/components/Nav'
import { FavProvider } from '@/context/FavContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavProvider>
      <Nav/>
      <main className="w-full">
      <Component {...pageProps} />
      </main>
    </FavProvider>
  )
}
