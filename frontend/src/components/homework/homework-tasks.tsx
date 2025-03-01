import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/authContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Trash2, RotateCcw, Check, X } from 'lucide-react';

interface HomeworkTask {
  _id: string;
  title: string;
  status: 'To-Do' | 'In Progress' | 'Done';
  dueDate: string;
  startTime?: string;
  endTime?: string;
  fpr?: string;
  dpRemark?: string;
  penaltyReward?: string;
  isImposed: boolean;
  session: string;
}

interface EditFormData extends Partial<HomeworkTask> {
  dueDate?: string;
}

interface HomeworkTasksProps {
  tasks: HomeworkTask[];
  loading: boolean;
  onRefresh: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'To-Do':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-500';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-700/20 dark:text-blue-500';
    case 'Done':
      return 'bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-500';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-500';
  }
};

const HomeworkTasks: React.FC<HomeworkTasksProps> = ({ tasks, loading, onRefresh }) => {
  const { token } = useAuth();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<EditFormData>({});
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleEditClick = (task: HomeworkTask) => {
    setEditingId(task._id);
    setEditFormData({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    try {
      if (!editingId) return;
      
      await axios.put(
        `${API_BASE_URL}/api/homework/${editingId}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Task updated successfully');
      setEditingId(null);
      setEditFormData({});
      onRefresh();
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/homework/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      toast.success('Homework task deleted successfully');
      onRefresh();
    } catch (error) {
      console.error('Error deleting homework task:', error);
      toast.error('Failed to delete homework task');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return '';
    
    try {
      // Convert 24-hour format to 12-hour format
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      
      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      return time;
    }
  };

  const getStatusBadge = (status: string) => {
    return <Badge className={getStatusColor(status)}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <p className="text-muted-foreground mb-4">No homework tasks found for this session.</p>
            <Button onClick={onRefresh}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead>FPR</TableHead>
                  <TableHead>DP Remark</TableHead>
                  <TableHead>Penalty/Reward</TableHead>
                  <TableHead>Imposed/Awarded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task._id}>
                    {editingId === task._id ? (
                      // Editable row
                      <>
                        <TableCell>
                          <Input
                            name="title"
                            value={editFormData.title || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={editFormData.status || 'To-Do'}
                            onValueChange={(value) => handleSelectChange('status', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="To-Do">To-Do</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="date"
                            name="dueDate"
                            value={editFormData.dueDate || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            name="startTime"
                            value={editFormData.startTime || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="time"
                            name="endTime"
                            value={editFormData.endTime || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="fpr"
                            value={editFormData.fpr || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="dpRemark"
                            value={editFormData.dpRemark || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            name="penaltyReward"
                            value={editFormData.penaltyReward || ''}
                            onChange={handleEditChange}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={editFormData.isImposed || false}
                            onCheckedChange={(checked) => handleSelectChange('isImposed', checked)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleSaveEdit}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleCancelEdit}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      // Read-only row
                      <>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                        </TableCell>
                        <TableCell>{task.startTime ? formatTime(task.startTime) : '-'}</TableCell>
                        <TableCell>{task.endTime ? formatTime(task.endTime) : '-'}</TableCell>
                        <TableCell>{task.fpr || '-'}</TableCell>
                        <TableCell>{task.dpRemark || '-'}</TableCell>
                        <TableCell>{task.penaltyReward || '-'}</TableCell>
                        <TableCell>
                          {task.isImposed && task.penaltyReward ? (
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-700/20 dark:text-purple-500">
                              {task.penaltyReward.startsWith('-') ? 'Imposed' : 'Awarded'}
                            </Badge>
                          ) : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditClick(task)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit 
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteId(task._id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={deleteId !== null} onOpenChange={(isOpen) => !isOpen && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the homework task.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HomeworkTasks;