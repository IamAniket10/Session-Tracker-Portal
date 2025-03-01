import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';


interface Session {
  _id: string;
  sessionNumber: number;
  sessionDate: string;
  title?: string;
  description?: string;
}

interface HomeworkOverviewProps {
  session: Session;
}

const HomeworkOverview: React.FC<HomeworkOverviewProps> = ({ session }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Session {session.sessionNumber} Overview
        {session.title && ` - ${session.title}`}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-700 dark:text-green-400 flex items-center text-sm font-medium">
              <CheckCircle className="mr-2 h-4 w-4" />
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-300">
              0
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center text-sm font-medium">
              <Clock className="mr-2 h-4 w-4" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
              0
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/30 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-yellow-700 dark:text-yellow-400 flex items-center text-sm font-medium">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">
              0
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Session Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(session.sessionDate).toLocaleDateString()}
                </p>
              </div>
              {session.description && (
                <div className="max-w-md">
                  <p className="text-sm font-medium">Session Description</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.description}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeworkOverview;