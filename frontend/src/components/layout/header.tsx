'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut, User, Settings, BookOpen, Brain } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
//import { motion } from 'framer-motion';

export default function Header() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    console.log("Header rendering with user:", user);

    return (
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Brain className="h-8 w-8 text-brand-600 dark:text-brand-500" />
                        <span className="font-bold text-xl text-gray-900 dark:text-white">Mental Health Matters Inc.</span>
                    </Link>

                    {user && (
                        <nav className="hidden md:flex  items-center space-x-6">
                            <Link
                                href="/sessions"
                                className={`text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors ${pathname && pathname.startsWith('/sessions') ? 'text-brand-600 dark:text-brand-500' : ''
                                    }`}
                            >
                                Sessions
                            </Link>
                            <Link
                                href="/homework"
                                className={`text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors flex  items-center gap-2 ${pathname && pathname.startsWith('/homework') ? 'text-brand-600 dark:text-brand-500' : ''
                                    }`}
                            >
                                <BookOpen className="h-4 w-4" />
                                Homework
                            </Link>
                        </nav>
                    )}

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {user ? (
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="border-brand-600 dark:border-brand-500">
                                        <User className="h-5 w-5 text-brand-600 dark:text-brand-500 mr-2" />
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            {user.name || 'User'}
                                        </span>
                                        <ChevronDown className={`h-4 w-4 text-brand-600 dark:text-brand-500 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    {user.isAdmin && (
                                        <DropdownMenuItem className="cursor-pointer" asChild>
                                            <Link href="/admin/create-session" className="flex items-center">
                                                <Settings className="h-4 w-4 mr-2" />
                                                Create Session
                                            </Link>
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuItem
                                        className="cursor-pointer text-destructive focus:text-destructive flex items-center text-red-600"
                                        onClick={logout}
                                    >
                                        <LogOut className="h-4 w-4 mr-2 " />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="outline" className="border-brand-600 dark:border-brand-500 text-brand-600 dark:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/50">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white">
                                        Sign up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}