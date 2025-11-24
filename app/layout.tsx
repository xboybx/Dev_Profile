import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jaswanth_Dev_Profile',
  description: 'Jaswanth Portfolio Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}