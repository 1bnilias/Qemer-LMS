import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Qemer - Modern Learning Management System",
    template: "%s | Qemer LMS"
  },
  description: "Master new skills with our comprehensive online courses. Learn from expert instructors with interactive content, assignments, and certifications.",
  keywords: ["online learning", "courses", "education", "LMS", "skill development", "certification"],
  authors: [{ name: "Qemer Team" }],
  creator: "Qemer",
  publisher: "Qemer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://Qemer-lms.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://Qemer-lms.com',
    title: 'Qemer - Modern Learning Management System',
    description: 'Master new skills with our comprehensive online courses.',
    siteName: 'Qemer LMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qemer - Modern Learning Management System',
    description: 'Master new skills with our comprehensive online courses.',
    creator: '@Qemer_lms',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="Qemer-theme"
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
