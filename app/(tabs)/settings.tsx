import {View, Text, TouchableOpacity} from "react-native";
import {useAuthStore} from "@/lib/authStore";
import {useRouter} from "expo-router";

export default function Settings() {
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login");
    };

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-lg mb-4">Settings</Text>

            <TouchableOpacity
                onPress={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-xl"
            >
                <Text className="text-white text-base">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}
