import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IMDB Clone',
  description: 'Your favorite movies, all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={dmSans.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <main className='container'>
            <Navbar />
            <div className='sm:px-8 md:px-16 sm:py-4 py-8  flex flex-col gap-10 z-0'>
              {children}
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
