import '../styles/global.css';
import React from 'react';
import SessionProviderWrapper from '@/app/lib/SessionProvider';

export const metadata = {
  title: "Mütercim",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
