// pages/_app.tsx
import '../styles/globals.css'; // Import global CSS styles
import type { AppProps } from 'next/app'; // Type for app props
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider for theme handling

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}> {/* Ensure system theme is respected */}
      <Component {...pageProps} /> {/* Render the active page */}
    </ThemeProvider>
  );
}

export default MyApp; // Export the app component
