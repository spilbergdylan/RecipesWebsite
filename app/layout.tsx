import './globals.css';
import type { Metadata } from 'next';
import { Lora, Caveat, Inter } from 'next/font/google';

const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Our Family Recipes',
  description: 'Cherished recipes from our family to yours'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="familyWarm">
      <body
        className={`${lora.variable} ${caveat.variable} ${inter.variable} min-h-screen flex items-center justify-center bg-cover bg-center`}
        style={{ backgroundImage: "url(/wood.jpg)" }}
      >
        <main className="w-full max-w-6xl px-4">{children}</main>
      </body>
    </html>
  );
} 