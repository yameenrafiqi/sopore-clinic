import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import Providers from './Providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Dr. Majid's Advanced Physiotherapy Clinic | Sopore, J&K",
  description:
    "Dr. Majid's Advanced Physiotherapy Clinic in Sopore, Jammu & Kashmir. Specializing in advanced rehabilitation, pain recovery, shockwave therapy, sports injury rehabilitation, and post-surgery rehab. Book your appointment today.",
  keywords: [
    "physiotherapy clinic Sopore",
    "Dr Majid physiotherapy",
    "physiotherapy Jammu Kashmir",
    "pain management Sopore",
    "sports injury rehabilitation",
    "shockwave therapy",
    "post surgery rehab",
    "back pain treatment",
    "neck pain treatment",
    "knee pain physiotherapy",
  ],
  authors: [{ name: "Dr. Majid's Advanced Physiotherapy Clinic" }],
  creator: "Dr. Majid's Advanced Physiotherapy Clinic",
  publisher: "Dr. Majid's Advanced Physiotherapy Clinic",
  metadataBase: new URL('https://drmajidphysio.co.in'),
  openGraph: {
    title: "Dr. Majid's Advanced Physiotherapy Clinic",
    description:
      "Advanced Rehabilitation & Pain Recovery. Located in Sopore, Jammu & Kashmir, India.",
    url: 'https://drmajidphysio.co.in',
    siteName: "Dr. Majid's Advanced Physiotherapy Clinic",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Dr. Majid's Advanced Physiotherapy Clinic",
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr. Majid's Advanced Physiotherapy Clinic",
    description:
      'Advanced Rehabilitation & Pain Recovery in Sopore, J&K, India.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://drmajidphysio.co.in',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <head>
        {/* Structured Data - Medical Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: "Dr. Majid's Advanced Physiotherapy Clinic",
              description:
                'Advanced physiotherapy clinic offering rehabilitation, pain recovery, shockwave therapy, and sports injury treatment.',
              url: 'https://drmajidphysio.co.in',
              telephone: '+91-XXXXXXXXXX',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Sopore',
                addressLocality: 'Sopore',
                addressRegion: 'Jammu & Kashmir',
                postalCode: '193201',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '34.2951',
                longitude: '74.4638',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday'],
                  opens: '09:00',
                  closes: '14:00',
                },
              ],
              medicalSpecialty: 'Physiotherapy',
              hasMap: 'https://maps.google.com',
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
