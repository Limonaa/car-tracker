import { create } from "zustand";
import {Expense} from "@/lib/types";

type ExpenseStore = {
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
    addExpense: (expense: Expense) => void;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
    expenses: [],
    setExpenses: (expenses) => set({ expenses }),
    addExpense: (expense) =>
        set((state) => ({ expenses: [...state.expenses, expense] })),
}));
