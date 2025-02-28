'use client';

import { motion } from 'framer-motion';
import Header from './header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-black transition-colors duration-300">
      <Header />
      <motion.main 
        className="flex-1 container mx-auto px-4 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="bg-white dark:bg-black py-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Mental Health Matters Inc. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors">Terms</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}