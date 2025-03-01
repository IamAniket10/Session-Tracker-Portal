'use client';

import ProtectedRoute from '@/components/auth/protectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SessionAccordion from '@/components/sessions/session-accordion';

export default function SessionsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionAccordion />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}