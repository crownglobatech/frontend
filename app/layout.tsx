import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './components/general/LayoutWrapper'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Assure Homes',
  description: 'Real Estate Web Application'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
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
