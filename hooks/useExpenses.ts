import {useUI} from "@/lib/store";
import {useEffect} from "react";
import {supabase} from "@/lib/supabase";
import {Expense} from "@/lib/types";

export function useExpenses(vehicleId?: string) {
    const { expensesByVehicle, setExpenses } = useUI();
    const expenses = (vehicleId && expensesByVehicle[vehicleId]) || [];

    useEffect(() => {
        if (!vehicleId) return;
        supabase.from("expenses")
            .select("*")
            .eq("vehicle_id", vehicleId)
            .order("date", { ascending: false })
            .then(({ data }) => setExpenses(vehicleId, data as Expense[]))

        const channel = supabase
            .channel(`expenses-${vehicleId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'expenses', filter: `vehicle_id=${vehicleId}` },
                () => supabase.from("expenses").select("*").eq("vehicle_id", vehicleId).order("date", { ascending: false })
                    .then(({ data }) => setExpenses(vehicleId, data as Expense[]))
            ).subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [vehicleId]);

    return { expenses };

}