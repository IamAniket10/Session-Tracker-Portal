export interface Session {
    _id: string;
    sessionNumber: number;
    sessionDate: string;
}

export interface HomeworkTask {
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

export interface EditFormData extends Partial<HomeworkTask> {
    dueDate?: string;
}

export interface HomeworkTasksProps {
    tasks: HomeworkTask[];
    loading: boolean;
    onRefresh: () => void;
}

export interface Notification {
    _id: string;
    title: string;
    message: string;
    daysLeft: number;
}

export interface ErrorResponse {
    message: string;
}