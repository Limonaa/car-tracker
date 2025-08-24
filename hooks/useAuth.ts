import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {Session} from "@supabase/supabase-js";


export function useAuth() {
    const [session, setSession] = useState<Session | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({data}) => setSession(data.session));
        const {data: sub} = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
        return () => sub.subscription.unsubscribe();
    }, []);
    return {session, user: session?.user};
}