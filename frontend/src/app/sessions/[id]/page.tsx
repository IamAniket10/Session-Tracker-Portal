'use client';

import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/protectedRoute';
import SessionAccordion from '@/components/sessions/session-accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SessionPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <SessionAccordion
                currentSessionId={id as string}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}