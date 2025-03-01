import React from 'react';

interface HomeworkPageWrapperProps {
  children: React.ReactNode;
  title: string;
  showThemeToggle?: boolean;
}

export default function HomeworkPageWrapper({ 
  children = false
}: HomeworkPageWrapperProps) {
  return (
    <div>
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}