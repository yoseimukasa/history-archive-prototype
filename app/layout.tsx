import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '団体歴史アーカイブ｜会員限定',
  description: '1920年から現在までの歩みを、写真・映像・ことばとともにたどる会員限定アーカイブ。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
