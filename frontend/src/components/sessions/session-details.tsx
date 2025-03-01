'use client';

import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import EditableCell from './editable-cell';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function SessionDetails({ sessionId, userDetails }) {
  const [details, setDetails] = useState(userDetails || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleUpdate = async (field, value) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`/api/sessions/${sessionId}/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      });
      
      if (response.ok) {
        const updatedDetails = await response.json();
        setDetails(updatedDetails);
      } else {
        setError('Failed to update');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add a new empty row
  const addNewRow = () => {
    // This doesn't save to the server yet, just adds to the UI
    const updatedDetails = { ...details };
    
    // If session insights is a string, convert it to an array with the existing string
    if (typeof updatedDetails.sessionInsights === 'string') {
      updatedDetails.sessionInsights = [updatedDetails.sessionInsights];
    } else if (!updatedDetails.sessionInsights) {
      updatedDetails.sessionInsights = [];
    }
    
    // Same for other fields
    if (typeof updatedDetails.weekAchievement === 'string') {
      updatedDetails.weekAchievement = [updatedDetails.weekAchievement];
    } else if (!updatedDetails.weekAchievement) {
      updatedDetails.weekAchievement = [];
    }
    
    if (typeof updatedDetails.decision === 'string') {
      updatedDetails.decision = [updatedDetails.decision];
    } else if (!updatedDetails.decision) {
      updatedDetails.decision = [];
    }
    
    // Add empty values to each array
    updatedDetails.sessionInsights.push('');
    updatedDetails.weekAchievement.push('');
    updatedDetails.decision.push('');
    
    setDetails(updatedDetails);
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading && <div className="text-brand-500 mb-2">Saving changes...</div>}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border p-2 text-left dark:border-gray-700">Session Insights</th>
              <th className="border p-2 text-left dark:border-gray-700">Week Achievements</th>
              <th className="border p-2 text-left dark:border-gray-700">Decisions</th>
              <th className="border p-2 text-left dark:border-gray-700">Total Profit</th>
              <th className="border p-2 text-left dark:border-gray-700">P1 (Invoice Profit)</th>
              <th className="border p-2 text-left dark:border-gray-700">P2 (Future Profit)</th>
              <th className="border p-2 text-left dark:border-gray-700">P3 (Cost Reduction)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <EditableCell 
                value={details.sessionInsights || ''} 
                onSave={(field, value) => handleUpdate('sessionInsights', value)} 
                fieldName="sessionInsights" 
              />
              <EditableCell 
                value={details.weekAchievement || ''} 
                onSave={(field, value) => handleUpdate('weekAchievement', value)} 
                fieldName="weekAchievement" 
              />
              <EditableCell 
                value={details.decision || ''} 
                onSave={(field, value) => handleUpdate('decision', value)} 
                fieldName="decision" 
              />
              <td className="border p-2 dark:border-gray-700">{details.totalProfit || 0}</td>
              <EditableCell 
                value={details.invoiceProfit || ''} 
                onSave={(field, value) => handleUpdate('invoiceProfit', value)} 
                fieldName="invoiceProfit" 
              />
              <EditableCell 
                value={details.futureProfit || ''} 
                onSave={(field, value) => handleUpdate('futureProfit', value)} 
                fieldName="futureProfit" 
              />
              <EditableCell 
                value={details.costReductionProfit || ''} 
                onSave={(field, value) => handleUpdate('costReductionProfit', value)} 
                fieldName="costReductionProfit" 
              />
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-brand-300 hover:bg-brand-100 hover:text-brand-700 dark:border-brand-700 dark:hover:bg-brand-900/40 dark:hover:text-brand-300"
          onClick={addNewRow}
        >
          <PlusCircle className="h-4 w-4" />
          Add Row
        </Button>
      </div>
    </div>
  );
}