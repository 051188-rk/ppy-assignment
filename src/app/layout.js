import './globals.css';
import Fonts from './components/Fonts';

export const metadata = {
  title: "Financial Dashboard",
  description: "Mock financial dashboard with charts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Fonts />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
