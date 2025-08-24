export type ExpenseType = 'fuel' | 'insurance' | 'tax' | 'other';
export type ReminderType = 'insurance' | 'service' | 'tax' | 'inspection';

export type Vehicle = {
    id: string; user_id: string; name: string;
    make?: string|null; model?: string|null;
    plate?: string|null; odometer?: number|null;
    created_at: string;
};

export type Expense = {
    id: string; user_id: string; vehicle_id: string;
    type: ExpenseType; amount: number; currency: string;
    date: string; note?: string|null; odometer?: number|null;
    created_at: string;
};

export type Reminder = {
    id: string; user_id: string; vehicle_id: string;
    type: ReminderType; due_date: string; note?: string|null;
    created_at: string; done: boolean;
};