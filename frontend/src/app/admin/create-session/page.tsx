'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import ProtectedRoute from '@/components/auth/protectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateSessionPage() {
  const [formData, setFormData] = useState({
    sessionNumber: '1',
    sessionDate: new Date().toISOString().split('T')[0],
    sessionTime: '1',
    weeklyEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    activityCovered: 'Welcome, Introduction, Next Steps'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Convert string values to appropriate types for API
      const apiData = {
        sessionNumber: parseInt(formData.sessionNumber),
        sessionDate: formData.sessionDate,
        sessionTime: parseInt(formData.sessionTime),
        weeklyEndDate: formData.weeklyEndDate,
        activityCovered: formData.activityCovered.split(',').map(item => item.trim())
      };

      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(apiData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Session created successfully!');
        setTimeout(() => {
          router.push('/sessions');
        }, 2000);
      } else {
        setMessage(`Error: ${data.message || 'Failed to create session'}`);
      }
    } catch (error) {
      setMessage("An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto p-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900 dark:text-gray-100">Create New Session</CardTitle>
          </CardHeader>
          <CardContent>
            {message && (
              <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 
                'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' : 
                'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'}`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="sessionNumber" className="text-gray-700 dark:text-gray-300">Session Number</Label>
                <Input 
                  id="sessionNumber"
                  type="number" 
                  value={formData.sessionNumber}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="sessionDate" className="text-gray-700 dark:text-gray-300">Session Date</Label>
                <Input 
                  id="sessionDate"
                  type="date" 
                  value={formData.sessionDate}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="sessionTime" className="text-gray-700 dark:text-gray-300">Session Time (hours)</Label>
                <Input 
                  id="sessionTime"
                  type="number" 
                  value={formData.sessionTime}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="weeklyEndDate" className="text-gray-700 dark:text-gray-300">Weekly End Date</Label>
                <Input 
                  id="weeklyEndDate"
                  type="date" 
                  value={formData.weeklyEndDate}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="activityCovered" className="text-gray-700 dark:text-gray-300">Activity Covered (comma separated)</Label>
                <Input 
                  id="activityCovered"
                  type="text" 
                  value={formData.activityCovered}
                  onChange={handleChange}
                  required
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-600 hover:bg-brand-700 text-white"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Session'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}