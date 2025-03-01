'use client';

interface SessionOverviewProps {
    session: any;
    isAdmin?: boolean;
  }

export default function SessionOverview({ session }: SessionOverviewProps) {
    if (!session) return null;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Session Number</h3>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{session.sessionNumber}</p>
                </div>

                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Session Date</h3>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{new Date(session.sessionDate).toLocaleDateString()}</p>
                </div>

                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Session Time (hrs)</h3>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{session.sessionTime}</p>
                </div>

                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly End Date</h3>
                    <p className="text-lg text-gray-900 dark:text-gray-100">{new Date(session.weeklyEndDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Activity Covered</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-900 dark:text-gray-100">
                    {session.activityCovered && session.activityCovered.map((activity: string, index: number) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}