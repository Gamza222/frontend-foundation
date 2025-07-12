import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Analytics',
  description: 'Crypto wallet analytics and leaderboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
