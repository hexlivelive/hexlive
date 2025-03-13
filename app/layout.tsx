import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hex Live',
  description: 'Hex Live',
  generator: 'Hex Live',
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
