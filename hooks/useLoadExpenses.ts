import {useExpenseStore} from "@/lib/expenseStore";
import {useEffect} from "react";
import {supabase} from "@/lib/supabase";
import {Expense} from "@/lib/types";

export function useLoadExpenses() {
    const setExpenses = useExpenseStore((s) => s.setExpenses)

    useEffect(() => {
        async function fetchExpenses() {
            const { data, error } = await supabase
                .from("expenses")
                .select("*")
                .order("date", { ascending: false });

            if (error) {
                console.log(error.message);
                return
            }

            if (data) {
                setExpenses(data as Expense[]);
            }
        }

        fetchExpenses();
    }, [setExpenses]);
}