import {Stack} from "expo-router";
import {useEffect} from "react";
import {useAuthStore} from "@/lib/authStore";
import {supabase} from "@/lib/supabase";
import "./globals.css";

export default function RootLayout() {
    const setSession = useAuthStore((s) => s.setSession);

    useEffect(() => {
        supabase.auth.getSession().then(({data}) => setSession(data.session));

        const {data: sub} = supabase.auth.onAuthStateChange((_e, s) => {
            setSession(s);
        });

        return () => sub.subscription.unsubscribe();
    }, []);

    return <Stack screenOptions={{headerShown: false}}/>;
}
