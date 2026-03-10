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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        {/* <SplashScreen> */}
        {children}
        {/* </SplashScreen> */}
      </body>
    </html>
  );
}
