import type { Metadata } from 'next';
import { Lato } from 'next/font/google'; // Import Lato
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

// Instantiate Lato
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], // Common weights
  variable: '--font-lato', // CSS variable name for Tailwind
});

export const metadata: Metadata = {
  title: 'Verbal Recall',
  description: 'A memory game for English and Spanish verbs and adjectives.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply the Lato font CSS variable to the html tag
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      {/* The font-sans class on body (from globals.css or here) will now use Lato via Tailwind config */}
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
