'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronDown, BookOpen } from 'lucide-react';
import Link from 'next/link';
import SessionOverview from './session-overview';
import SessionDetails from './session-details';
import { motion, AnimatePresence } from 'framer-motion';

export default function SessionAccordion({ onSelectSession, currentSessionId }) {
  const [sessions, setSessions] = useState([]);
  const [expandedSession, setExpandedSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  //const router = useRouter();
  const [sessionDetails, setSessionDetails] = useState({});
  const [animatingSessionId, setAnimatingSessionId] = useState(null);
  
  const accordionRefs = useRef({});

  useEffect(() => {
    if (currentSessionId) {
      setExpandedSession(currentSessionId);
    }
    
    const fetchSessions = async () => {
      if (!token) return;
      
      try {
        const response = await fetch('/api/sessions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSessions(data);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [token, currentSessionId]);

  const toggleSession = async (sessionId) => {
    // Set animating state to show loading spinner or visual feedback
    setAnimatingSessionId(sessionId);
    
    if (expandedSession === sessionId) {
      setExpandedSession(null);
    } else {
      setExpandedSession(sessionId);
      
      // Fetch session details if needed
      if (!sessionDetails[sessionId]) {
        await fetchSessionDetails(sessionId);
      }
      
      if (onSelectSession) {
        onSelectSession(sessionId);
      }
      
      // Smooth scroll to the accordion item
      if (accordionRefs.current[sessionId]) {
        accordionRefs.current[sessionId].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
    
    // Remove animating state after a short delay
    setTimeout(() => {
      setAnimatingSessionId(null);
    }, 300);
  };

  const fetchSessionDetails = async (sessionId) => {
    if (!token) return;
    
    try {
      // Fetch session overview
      const sessionRes = await fetch(`/api/sessions/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Fetch user details
      const detailsRes = await fetch(`/api/sessions/${sessionId}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (sessionRes.ok && detailsRes.ok) {
        const sessionData = await sessionRes.json();
        const detailsData = await detailsRes.json();
        
        setSessionDetails(prev => ({
          ...prev,
          [sessionId]: {
            session: sessionData,
            userDetails: detailsData
          }
        }));
      }
    } catch (err) {
      console.error('Error fetching session data:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {sessions.map((session) => (
        <div 
          key={session._id} 
          className="py-2"
          ref={el => accordionRefs.current[session._id] = el}
        >
          <div 
            className={`flex justify-between items-center py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 
                      ${expandedSession === session._id ? 
                        'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300' : 
                        'hover:bg-gray-50 dark:hover:bg-gray-800/50'} 
                      ${animatingSessionId === session._id ? 'bg-brand-100 dark:bg-brand-900/40' : ''}`}
            onClick={() => toggleSession(session._id)}
          >
            <div className="font-medium flex items-center">
              <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center 
                            ${expandedSession === session._id ? 
                              'bg-brand-200 text-brand-800 dark:bg-brand-800 dark:text-brand-200' : 
                              'bg-gray-200 dark:bg-gray-700 dark:text-gray-300'}`}>
                {session.sessionNumber}
              </div>
              <span>
                Session {session.sessionNumber} 
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({new Date(session.sessionDate).toLocaleDateString()})
                </span>
              </span>
            </div>
            
            <div className="flex items-center">
              {animatingSessionId === session._id && (
                <div className="animate-spin h-4 w-4 border-2 border-brand-500 rounded-full mr-2"></div>
              )}
              <ChevronDown 
                className={`h-5 w-5 transition-transform duration-300 ease-in-out 
                           ${expandedSession === session._id ? 
                            'transform rotate-180 text-brand-600 dark:text-brand-400' : 
                            'text-gray-400 dark:text-gray-500'}`} 
              />
            </div>
          </div>
          
          <AnimatePresence>
            {expandedSession === session._id && sessionDetails[session._id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4 pl-6 pr-4 pb-4 border-l-2 border-brand-200 dark:border-brand-800">
                  {/* Session Overview */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-800 p-5 rounded-md shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Session Overview</h3>
                    <SessionOverview 
                      session={sessionDetails[session._id].session} 
                      isAdmin={false} 
                    />
                  </motion.div>
                  
                  {/* Session Details */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-5 rounded-md shadow-sm border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Session Details</h3>
                    <SessionDetails 
                      sessionId={session._id}
                      userDetails={sessionDetails[session._id].userDetails}
                      isAdmin={false}
                    />
                    
                    {/* Homework Link */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-5 flex justify-end"
                    >
                      <Link href={`/homework?session=${session._id}`}>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2 transition-all duration-200 hover:bg-brand-100 hover:text-brand-700 hover:border-brand-300 dark:hover:bg-brand-900/40 dark:hover:text-brand-300"
                        >
                          <BookOpen className="h-4 w-4" />
                          View Homework
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}