import {Slot} from "expo-router";
import {useAuthStore} from "@/lib/authStore";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";

export default function AuthLayout() {
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (user) {
            router.replace("/(tabs)");
        } else {
            setReady(true);
        }
    }, [user]);

    if (!ready) return null;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Slot/>
        </SafeAreaView>
    );
}
