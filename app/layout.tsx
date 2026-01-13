import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './components/general/LayoutWrapper'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CrownHaven',
  description: 'Real Estate Web Application'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={outfit.className}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
