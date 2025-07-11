import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HeadsUp',
  description: 'Where Fortune Favors the Bold',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
