import {differenceInDays} from "date-fns";

export function formatExpenseDate(date: string | Date, mode: "future" | "past") {
    const now = new Date();
    const d = typeof date === "string" ? new Date(date) : date;
    const diff = differenceInDays(d, now);

    if (mode === "future") {
        if (diff < 0) return "Overdue";
        if (diff === 0) return "Due today";
        return `Due in ${diff} day${diff === 1 ? "" : "s"}`;
    }

    const pastDiff = differenceInDays(now, d);
    if (pastDiff === 0) return "Today";
    return `${pastDiff} day${pastDiff === 1 ? "" : "s"} ago`;
}