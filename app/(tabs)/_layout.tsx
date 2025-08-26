import {Tabs, useNavigation, useRouter} from "expo-router";
import {useAuthStore} from "@/lib/authStore";
import {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Home, Car, Settings, BadgeCent} from 'lucide-react-native';

export default function TabsLayout() {
    const user = useAuthStore((s) => s.user);
    const router = useRouter();
    const navigation = useNavigation();
    const [navigationReady, setNavigationReady] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation?.addListener?.("state", () => {
            setNavigationReady(true);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (!navigationReady) return;
        if (user === null) {
            router.replace("/(auth)/login");
        }
    }, [user, navigationReady]);

    if (!navigationReady || user === null) return null;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#1D4ED8",
                    tabBarInactiveTintColor: "#6B7280",
                    tabBarStyle: {
                        backgroundColor: "#fff",
                        height: 60,
                        borderTopWidth: 1,
                        borderTopColor: "#e5e7eb"
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Dashboard",
                        tabBarLabel: "Home",
                        tabBarIcon: ({color, size}) => (
                            <Home color={color} size={size}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="vehicles"
                    options={{
                        title: "Vehicles",
                        tabBarLabel: "Vehicles",
                        tabBarIcon: ({color, size}) => (
                            <Car color={color} size={size}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="expenses"
                    options={{
                        title: "Expenses",
                        tabBarLabel: "Expenses",
                        tabBarIcon: ({color, size}) => (
                            <BadgeCent size={size} color={color}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarLabel: "Settings",
                        tabBarIcon: ({color, size}) => (
                            <Settings color={color} size={size}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="vehicle/[id]"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="vehicle/new"
                    options={{
                        href: null
                    }}
                />
                <Tabs.Screen
                    name="expense/new"
                    options={{
                        href: null
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}
