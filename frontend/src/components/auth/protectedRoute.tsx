'use client';

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "../layout/main-layout";

export default function ProtectedRoute({
    children,
    adminOnly = false
}: {
    children: React.ReactNode;
    adminOnly?: boolean;
}) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (adminOnly && !user?.isAdmin) {
                router.push('/sessions');
            }
        }
    }, [isAuthenticated, isLoading, router, adminOnly, user]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated || (adminOnly && !user?.isAdmin)) {
        return null;
    }

    return <MainLayout>{children}</MainLayout>;
}

