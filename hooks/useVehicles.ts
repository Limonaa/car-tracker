import {useUI} from "@/lib/store";
import {useEffect} from "react";
import {Vehicle} from "@/lib/types";
import {supabase} from "@/lib/supabase";


export function useVehicles(userId?: string) {
    const { vehicles, setVehicles, setLoading } = useUI();

    useEffect(() => {
        if (!userId) return;
        let mounted = true;
        (async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("vehicles")
                .select("*")
                .order('created_at', { ascending: false });
            if (!error && mounted) setVehicles(data as Vehicle[]);
            setLoading(false);
        })();

        const channel = supabase
            .channel("vehicles-changes")
            .on("postgres_changes", { event: '*', schema: 'public', table: 'vehicles' }, () => {
                supabase.from("vehicles").select("*").order("created_at", { ascending: false }).then(({ data }) => setVehicles(data as Vehicle[]));
            })
            .subscribe();
        return () => { mounted = false; supabase.removeChannel(channel); };
        }, [userId]);

    return { vehicles };
}