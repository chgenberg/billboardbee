import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Providers } from './providers'

const nunito = Nunito({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'BillboardBee - Hyr och hyr ut reklamplatser enkelt',
  description: 'Sveriges ledande marknadsplats för utomhusreklam. Hitta perfekta skyltplatser eller hyr ut dina egna ytor.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

// OBS! Inga kolon eller typdeklarationer i parametern, och ingen kod efter sista }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={`${nunito.className} min-h-screen flex flex-col bg-white relative`}>
        <Providers>
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