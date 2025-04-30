import type { Metadata } from 'next';
import { Geist_Mono as GeistMono } from 'next/font/google';
import { Dancing_Script as DancingScript } from 'next/font/google'; // Import Dancing Script
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Github, Linkedin, Heart } from 'lucide-react'; // Import icons

// Configure Dancing Script font
const dancingScript = DancingScript({
  subsets: ['latin'],
  variable: '--font-dancing-script', // Define CSS variable
});


const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PalettePro',
  description: 'Generate beautiful color palettes effortlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* Apply Dancing Script font variable */}
      <body className={`${dancingScript.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <div className="flex-grow">
          {children}
        </div>
        <Toaster />
        <footer className="w-full py-4 px-6 mt-8 bg-secondary text-secondary-foreground shadow-inner">
          {/* Updated container class: removed sm:flex-row and related spacing, ensuring flex-col */}
          <div className="container mx-auto flex flex-col justify-center items-center text-center text-sm space-y-2">
            <span className="flex items-center font-sans">
              Made With <Heart className="w-4 h-4 mx-1 text-accent fill-current" /> by Nidhi Nayana
            </span>
            <div className="flex space-x-3">
              <a
                href="https://github.com/nidhi-nayana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-primary transition-colors"
                aria-label="Nidhi Nayana's GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nidhi-nayana/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-foreground hover:text-primary transition-colors"
                aria-label="Nidhi Nayana's LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
