import {Tabs, Redirect} from "expo-router";
import {useAuth} from "@/hooks/useAuth";

export default function TabsLayout() {
    const {user} = useAuth();
    if (!user) return <Redirect href="/(auth)/login"/>;

    return (
        <Tabs screenOptions={{headerTitle: "", tabBarActiveTintColor: "#0EA5E9"}}>
            <Tabs.Screen name="index" options={{title: "Dashboard"}}/>
            <Tabs.Screen name="vehicles" options={{title: "Vehicles"}}/>
            <Tabs.Screen name="expenses" options={{title: "Expenses"}}/>
            <Tabs.Screen name="settings" options={{title: "Settings"}}/>
        </Tabs>
    );
}
