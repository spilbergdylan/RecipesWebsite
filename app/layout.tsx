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
        className={`${lora.variable} ${caveat.variable} ${inter.variable} h-dvh min-h-0 overflow-hidden flex items-start md:items-center justify-center bg-repeat-y bg-top pt-[env(safe-area-inset-top)] md:pt-0`}
        style={{ backgroundImage: "url(/wood.jpg)", backgroundSize: '100% auto', backgroundPosition: 'top center' }}
      >
        <main className="w-full max-w-6xl px-4 py-4 md:py-6">{children}</main>
      </body>
    </html>
  );
} 