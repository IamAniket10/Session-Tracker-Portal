'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-brand-600 dark:text-brand-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-6">Oops! Page not found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}