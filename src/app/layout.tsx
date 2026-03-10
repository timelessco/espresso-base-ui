import type { Metadata } from "next";
import "./globals.css";
// import SplashScreen from "./components/splash-screen";

export const metadata: Metadata = {
  title: "Base UI Espresso",
  description: "Base UI Espresso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* <SplashScreen> */}
        {children}
        {/* </SplashScreen> */}
      </body>
    </html>
  );
}
