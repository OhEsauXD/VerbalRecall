import type { Metadata } from 'next';
import { GeistSans } from "geist/font/sans"; // Import the font object
import { GeistMono } from "geist/font/mono";  // Import the font object
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

// The GeistSans and GeistMono objects already contain the necessary info,
// including the CSS variable name. We don't call them as functions.

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
    <html lang="en" suppressHydrationWarning>
       {/* Apply the font variables directly to the body className */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Set dark as default
          enableSystem={false} // Disable system theme detection if dark is default
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
