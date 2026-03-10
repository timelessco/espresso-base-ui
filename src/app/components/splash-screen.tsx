"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Phase = "splash" | "loader" | "done";

export default function SplashScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("splash");
  const [splashVisible, setSplashVisible] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    // Fade in the splash
    const fadeInTimer = setTimeout(() => setSplashVisible(true), 50);

    // After 2s visible, fade out splash
    const fadeOutTimer = setTimeout(() => setSplashVisible(false), 2050);

    // After fade-out transition (700ms), switch to loader
    const loaderTimer = setTimeout(() => {
      setPhase("loader");
      setTimeout(() => setLoaderVisible(true), 50);
    }, 2750);

    // After 1s of loader, fade out loader
    const loaderFadeOutTimer = setTimeout(() => {
      setLoaderVisible(false);
    }, 3800);

    // After loader fade-out, show home
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 4500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(loaderTimer);
      clearTimeout(loaderFadeOutTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") {
    return <>{children}</>;
  }

  return (
    <>
      {phase === "splash" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 bg-primary"
          style={{ opacity: splashVisible ? 1 : 0 }}
        >
          <div className="flex flex-col items-center gap-4 w-screen h-screen">
            <div className="text-center flex-1 flex flex-col items-center justify-center">
              <div className="text-[144px] font-bold tracking-[-2.88px] leading-[144px] text-primary-foreground">
                Espresso
              </div>
              <div className="text-lg text-zinc-500">Design system</div>
            </div>
            <div className="bg-light-gray-200 p-4 w-full flex items-center justify-between">
              <p className="text-base text-zinc-500">Version 1.0</p>
              <Link
                href="https://frappe.io/"
                target="_blank"
                className="text-base text-zinc-500"
              >
                <span className="text-zinc-900 font-normal underline flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  frappe.io
                </span>
              </Link>
              <p className="text-base text-zinc-500">
                Designed by
                <Link
                  href="https://timeless.co/"
                  target="_blank"
                  className="text-zinc-900 font-semibold pl-1 cursor-pointer underline"
                >
                  Timeless
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {phase === "loader" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700"
          style={{ opacity: loaderVisible ? 1 : 0 }}
        >
          <div className="splash-loader" />
        </div>
      )}
    </>
  );
}
