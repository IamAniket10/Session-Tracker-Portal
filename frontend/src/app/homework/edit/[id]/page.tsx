'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/authContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CalendarIcon, Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import HomeworkPageWrapper from '@/components/homework/homework-page-wrapper';
import { useParams, useRouter } from 'next/navigation';

export default function EditHomeworkPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    console.log("Homework ID:", id); 

    const [sessions, setSessions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        status: '',
        dueDate: '',
        startTime: '',
        endTime: '',
        fpr: '',
        dpRemark: '',
        penaltyReward: '',
        isImposed: false,
        session: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchData = async () => {
            try {

                console.log("Fetching homework with ID:", id);
                console.log("Using token:", token.substring(0, 10) + "...");

                // Fetch homework task details
                const { data: taskData } = await axios.get(
                    `${API_BASE_URL}/api/homework/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                // Fetch sessions for dropdown
                const { data: sessionsData } = await axios.get(
                    `${API_BASE_URL}/api/sessions`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setSessions(sessionsData);

                // Format date for input field
                const formattedDate = taskData.dueDate ?
                    new Date(taskData.dueDate).toISOString().split('T')[0] : '';

                setFormData({
                    ...taskData,
                    dueDate: formattedDate
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load homework task details');
                router.push('/homework');
            }
        };

        fetchData();
    }, [user, id, router]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleValueChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await axios.put(
                `${API_BASE_URL}/api/homework/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Homework task updated successfully');
            router.push('/homework');
        } catch (error) {
            console.error('Error updating homework task:', error);
            toast.error(error.response?.data?.message || 'Failed to update homework task');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <HomeworkPageWrapper title="Edit Homework Task">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
            </HomeworkPageWrapper>
        );
    }

    return (
        <HomeworkPageWrapper title="Edit Homework Task">
            <div className="flex items-center mb-6">
                <Button
                    variant="ghost"
                    className="mr-2"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Edit Homework Task</h1>
            </div>

            <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader className="bg-purple-50 dark:bg-purple-950/30 border-b border-purple-100 dark:border-purple-900/50">
                    <CardTitle className="text-purple-800 dark:text-purple-300">Edit Task Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form id="edit-homework-form" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <Label htmlFor="title">Task Title*</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="session">Session*</Label>
                                <Select
                                    name="session"
                                    value={formData.session}
                                    onValueChange={(value) => handleValueChange('session', value)}
                                >
                                    <SelectTrigger className="w-full mt-1">
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

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    name="status"
                                    value={formData.status}
                                    onValueChange={(value) => handleValueChange('status', value)}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To-Do">To-Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="dueDate" className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    Due Date*
                                </Label>
                                <Input
                                    id="dueDate"
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="startTime" className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    Start Time
                                </Label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="endTime" className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    End Time
                                </Label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    name="endTime"
                                    value={formData.endTime}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="fpr">FPR</Label>
                                <Input
                                    id="fpr"
                                    type="text"
                                    name="fpr"
                                    value={formData.fpr || ''}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="dpRemark">DP Remark</Label>
                                <Input
                                    id="dpRemark"
                                    type="text"
                                    name="dpRemark"
                                    value={formData.dpRemark || ''}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="penaltyReward">Penalty/Reward</Label>
                                <Input
                                    id="penaltyReward"
                                    type="text"
                                    name="penaltyReward"
                                    value={formData.penaltyReward || ''}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-4">
                                <Checkbox
                                    id="isImposed"
                                    name="isImposed"
                                    checked={formData.isImposed}
                                    onCheckedChange={(checked) => 
                                        handleValueChange('isImposed', checked)
                                    }
                                />
                                <Label
                                    htmlFor="isImposed"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Imposed/Awarded
                                </Label>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 bg-purple-50/50 dark:bg-purple-950/20 border-t border-purple-100 dark:border-purple-900/50 p-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/homework')}
                        disabled={submitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="edit-homework-form"
                        disabled={submitting}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        {submitting ? 'Updating...' : 'Update Task'}
                    </Button>
                </CardFooter>
            </Card>
        </HomeworkPageWrapper>
    );
}