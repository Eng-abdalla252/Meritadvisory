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
  openGraph: {
    title: 'Merit Advisory Services | ERP Implementation & Digital Transformation',
    description:
      'Merit Advisory Services is a leading digital transformation and ERP consulting company. We help enterprises modernize with ERP implementation, accounting systems, and business automation.',
    url: 'https://meritadvisory.so',
    siteName: 'Merit Advisory',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Merit Advisory Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merit Advisory Services | ERP Implementation & Digital Transformation',
    description:
      'Merit Advisory Services is a leading digital transformation and ERP consulting company.',
    images: ['/favicon.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://meritadvisory.so" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: 'Merit Advisory Services',
              url: 'https://meritadvisory.so',
              logo: 'https://meritadvisory.so/favicon.png',
              sameAs: [
                'https://www.linkedin.com/company/merit-advisory-services-llp/',
                'https://x.com/LlpMerit',
                'https://www.facebook.com/meritsomalia',
                'https://www.youtube.com/@MeritAdvisoryServicesLLP',
              ],
              contactPoint: [
                {
                  "@type": 'ContactPoint',
                  telephone: '+1 672-572-3750',
                  contactType: 'customer service',
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
