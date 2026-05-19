import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Merit Advisory Services | ERP Implementation & Digital Transformation',
  description:
    'Merit Advisory Services is a leading digital transformation and ERP consulting company. We help enterprises modernize with ERP implementation, accounting systems, and business automation.',
  keywords: [
    'ERP Implementation',
    'Digital Transformation',
    'Business Automation',
    'Odoo Solutions',
    'Accounting Modernization',
    'Enterprise Consulting',
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
