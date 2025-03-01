'use client';

import { useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';

interface EditableCellProps {
    value: string | number;
    onSave: (fieldName: string, value: string | number) => void;
    fieldName: string;
}

export default function EditableCell({ value, onSave, fieldName }: EditableCellProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
        onSave(fieldName, editValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <td className="border p-2 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                    <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8"
                        autoFocus
                    />
                    <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={handleSave} className="text-brand-600 hover:text-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900">
                            <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancel} className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </td>
        );
    }

    return (
        <td className="border p-2 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <span>{value}</span>
                <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-50 hover:opacity-100 text-brand-600 hover:text-brand-800 hover:bg-brand-100 dark:hover:bg-brand-900"
                    onClick={() => setIsEditing(true)}
                >
                    <Edit className="h-4 w-4" />
                </Button>
            </div>
        </td>
    );
}