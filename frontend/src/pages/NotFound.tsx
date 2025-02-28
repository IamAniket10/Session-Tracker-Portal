import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-bold text-brand-600 dark:text-brand-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-6">Oops! Page not found</p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <a href="/">
          <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
            Return to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;