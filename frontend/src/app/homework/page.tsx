'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Bell } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/context/authContext';
import HomeworkOverview from '@/components/homework/homework-overview';
import HomeworkTasks from '@/components/homework/homework-tasks';
import HomeworkPageWrapper from '@/components/homework/homework-page-wrapper';
import { Session, HomeworkTask, Notification } from '@/types/index';


export default function HomeworkPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [homeworkTasks, setHomeworkTasks] = useState<HomeworkTask[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchSessions = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/sessions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSessions(data);

                if (data.length > 0) {
                    setSelectedSession(data[0]);
                    fetchHomeworkTasks(data[0]._id);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
                toast.error('Failed to load sessions');
                setLoading(false);
            }
        };

        fetchSessions();
    }, [user, token, router]);

    // Instead of fetching notifications from API (which doesn't exist yet)
    // Generate dummy notifications based on homework tasks
    useEffect(() => {
        if (homeworkTasks.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const upcoming = homeworkTasks.filter((task) => {
                if (!task.dueDate) return false;

                const dueDate = new Date(task.dueDate);
                dueDate.setHours(0, 0, 0, 0);

                // Tasks due today or in the next 2 days
                const diffTime = dueDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return diffDays >= 0 && diffDays <= 2 && task.status !== 'Done';
            }).map(task => ({
                _id: task._id,
                title: task.title,
                message: `Due: ${new Date(task.dueDate).toLocaleDateString()}`,
                daysLeft: Math.ceil((new Date(task.dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
            }));

            setNotifications(upcoming);
        }
    }, [homeworkTasks]);

    const fetchHomeworkTasks = async (sessionId: string) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/homework/session/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHomeworkTasks(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching homework tasks:', error);
            toast.error('Failed to load homework tasks');
            setLoading(false);
        }
    };

    const handleSessionChange = (sessionId: string) => {
        const session = sessions.find(s => s._id === sessionId) as Session;
        setSelectedSession(session);
        fetchHomeworkTasks(sessionId);
    };

    const handleAddTask = () => {
        router.push(`/homework/add?session=${selectedSession?._id || ''}`);
    };

    const markNotificationAsRead = (notificationId: string) => {
        // Remove the notification from the state
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
    };

    // Use an empty string for title to avoid showing redundant titles
    return (
        <HomeworkPageWrapper title="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Homework Management</h1>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-4 w-4" />
                                {notifications.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {notifications.length}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72">
                            {notifications.length > 0 ? (
                                notifications.map((notification) => (
                                    <DropdownMenuItem
                                        key={notification._id}
                                        className="cursor-pointer flex flex-col items-start py-2"
                                        onClick={() => markNotificationAsRead(notification._id)}
                                    >
                                        <span className="font-medium">{notification.title}</span>
                                        <div className="flex justify-between w-full mt-1">
                                            <span className="text-sm text-muted-foreground">{notification.message}</span>
                                            <Badge variant={notification.daysLeft === 0 ? "destructive" : "outline"}>
                                                {notification.daysLeft === 0 ? "Today" :
                                                    notification.daysLeft === 1 ? "Tomorrow" :
                                                        `${notification.daysLeft} days left`}
                                            </Badge>
                                        </div>
                                    </DropdownMenuItem>
                                ))
                            ) : (
                                <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="w-full md:w-64">
                            <label htmlFor="sessionSelect" className="block text-sm font-medium mb-2">
                                Select Session:
                            </label>
                            <Select
                                value={selectedSession?._id || ''}
                                onValueChange={handleSessionChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a session" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sessions.map((session) => (
                                        <SelectItem key={session._id} value={session._id}>
                                            Session {session.sessionNumber} ({new Date(session.sessionDate).toLocaleDateString()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {selectedSession && (
                <>
                    <HomeworkOverview session={selectedSession} />
                    <div className="flex justify-between items-center my-6">
                        <h2 className="text-xl font-semibold">Homework Tasks</h2>
                        <Button onClick={handleAddTask} className="bg-purple-600 hover:bg-purple-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Task
                        </Button>
                    </div>
                    <HomeworkTasks
                        tasks={homeworkTasks}
                        loading={loading}
                        onRefresh={() => fetchHomeworkTasks(selectedSession._id)}
                    />
                </>
            )}
        </HomeworkPageWrapper>
    );
}