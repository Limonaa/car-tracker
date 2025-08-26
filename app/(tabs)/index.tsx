import React from 'react';
import {FlatList, Text, View} from "react-native";
import {useVehicles} from "@/hooks/useVehicles";
import Button from "@/components/Button";
import {useUI} from "@/lib/store";
import {Link} from "expo-router";
import {useAuthStore} from "@/lib/authStore";

export default function Dashboard() {
    const user = useAuthStore((s) => s.user);

    const {vehicles} = useVehicles(user?.id);
    const {selectedVehicleId, setSelectedVehicleId} = useUI();

    return (
        <View className={"flex-1 p-4 gap-4"}>
            <Text className={"text-2xl font-semibold"}>Hello</Text>
            <Text className={"text-gray-600"}>Your vehicles</Text>

            <FlatList
                data={vehicles}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <View
                        className={`mr-3 p-4 rounded-2xl border ${selectedVehicleId === item.id ? "border-brand bg-sky-50" : "border-gray-200"}`}>
                        <Text className={"font-semibold"}>{item.name}</Text>
                        <Text className={"text-gray-500"}>{item.make} {item.model}</Text>
                        <Button
                            size={"sm"}
                            title={selectedVehicleId === item.id ? "Selected" : "Select"}
                            onPress={() => setSelectedVehicleId(item.id)}
                            className={"mt-2"}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text className={"text-gray-400"}>No vehicles found!</Text>}
            />

            <Link href={"/expense/new"} asChild>
                <Button title="Add expense"/>
            </Link>
            <Link href={"/vehicle/new"} asChild>
                <Button title="Add vehicle"/>
            </Link>
        </View>
    )
}