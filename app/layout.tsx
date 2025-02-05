import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'UnzipFast - Online ZIP File Viewer',
  description: 'View and extract ZIP files online without installing any software. Fast, secure, and easy to use.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`} suppressHydrationWarning>
        {children}
        <Footer />
      </body>
    </html>
  )
}
