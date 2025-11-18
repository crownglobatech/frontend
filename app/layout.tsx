import type { Metadata } from 'next'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from './store'
import LayoutWrapper from './components/general/LayoutWrapper'
export const metadata: Metadata = {
  title: 'CrownHaven',
  description: 'Real Estate Web Application'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <LayoutWrapper>
          {children} 
        </LayoutWrapper>
      </body>
    </html>
  )
}
