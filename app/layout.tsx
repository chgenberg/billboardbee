import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Providers } from './providers'
import OverlayNavbar from './components/OverlayNavbar'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'Billboard Bee',
  description: 'Billboard Bee - Din digitala annonsplats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={`${nunito.className} min-h-screen flex flex-col bg-white relative`}>
        <Providers>
          <OverlayNavbar />
          <Navbar />
          <main className="flex-grow relative z-10 pt-20">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  )
} 