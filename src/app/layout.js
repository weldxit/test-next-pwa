'use client'
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then((registration) => {
          console.log('Service worker registered successfully. Scope:', registration.scope);
        })
        .catch((error) => {
          console.log('Service worker registration failed:', error);
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <button id="install-button" style={{ display: 'none' }}>
          Install App
        </button>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
