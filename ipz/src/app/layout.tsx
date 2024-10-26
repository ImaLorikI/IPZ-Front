'use client'

import type { Metadata } from "next";
import localFont from "next/font/local";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/API/Auth/authAPI';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await getUser(token);
        setIsLoading(false);
      } catch (error) {
        console.error('User not authenticated:', error);
        router.push('/registration');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
