import { useMemo } from "react";

export function useMonthlyExpenses(expenses: { amount: number; date: string }[]) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = now.getFullYear();
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    return useMemo(() => {
        let currentTotal = 0;
        let prevTotal = 0;

        for (const e of expenses) {
            const d = new Date(e.date);

            if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
                currentTotal += e.amount;
            } else if (d.getMonth() === prevMonth && d.getFullYear() === prevYear) {
                prevTotal += e.amount;
            }
        }

        return { currentTotal, prevTotal, currentMonth, prevMonth };
    }, [expenses, currentMonth, prevMonth, currentYear, prevYear]);
}
