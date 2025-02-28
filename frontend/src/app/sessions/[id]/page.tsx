// // src/app/sessions/[id]/page.tsx (Add this near the end)
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useAuth } from '@/context/authContext';
// import ProtectedRoute from '@/components/auth/protectedRoute';
// import SessionAccordion from '@/components/sessions/session-accordion';
// import SessionOverview from '@/components/sessions/session-overview';
// import SessionDetails from '@/components/sessions/session-details';
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { BookOpen } from 'lucide-react';
// import Link from 'next/link';
// import MainLayout from '@/components/layout/main-layout';

// export default function SessionPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [session, setSession] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { user, token } = useAuth();

//   const fetchSessionData = async (sessionId) => {
//     if (!sessionId || !token) return;
    
//     setLoading(true);
//     try {
//       // Fetch session overview
//       const sessionRes = await fetch(`/api/sessions/${sessionId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       // Fetch user details
//       const detailsRes = await fetch(`/api/sessions/${sessionId}/details`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (sessionRes.ok && detailsRes.ok) {
//         const sessionData = await sessionRes.json();
//         const detailsData = await detailsRes.json();
        
//         setSession(sessionData);
//         setUserDetails(detailsData);
//       }
//     } catch (err) {
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessionData(id);
//   }, [id, token]);

//   const handleSessionSelect = (sessionId) => {
//     fetchSessionData(sessionId);
//   };

//   return (
//     <ProtectedRoute>
//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 gap-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Sessions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <SessionAccordion 
//                 //onSelectSession={handleSessionSelect} 
//                 currentSessionId={id as string}
//               />
//             </CardContent>
//           </Card>

//           {loading ? (
//             <div className="text-center p-4">Loading session data...</div>
//           ) : (
//             <>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Session Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <SessionOverview 
//                     session={session} 
//                     isAdmin={user?.isAdmin} 
//                   />
//                 </CardContent>
//                 <CardFooter className="flex justify-end">
//                   <Link href={`/homework?session=${id}`}>
//                     <Button variant="outline" className="flex items-center gap-2">
//                       <BookOpen className="h-4 w-4" />
//                       View Homework
//                     </Button>
//                   </Link>
//                 </CardFooter>
//               </Card>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Session Details</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <SessionDetails 
//                     sessionId={id as string} 
//                     userDetails={userDetails} 
//                     isAdmin={user?.isAdmin} 
//                   />
//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

// src/app/sessions/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import ProtectedRoute from '@/components/auth/protectedRoute';
import SessionAccordion from '@/components/sessions/session-accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SessionPage() {
  const { id } = useParams();
  const { user } = useAuth();

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