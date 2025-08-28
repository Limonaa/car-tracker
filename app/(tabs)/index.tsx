import React from 'react';
import {FlatList, Text, View} from "react-native";
import {useVehicles} from "@/hooks/useVehicles";
import Button from "@/components/Button";
import {useUI} from "@/lib/store";
import {Link} from "expo-router";
import {useAuthStore} from "@/lib/authStore";
import VehicleCard from "@/components/VehicleCard";

export default function Dashboard() {
    const user = useAuthStore((s) => s.user);
    const {vehicles} = useVehicles(user?.id);
    const {selectedVehicleId, setSelectedVehicleId} = useUI();

    const selectedVehicle = vehicles?.find((v) => v.id === selectedVehicleId);

    const vehicleDetails = () => {
        console.log("vehicle details")
        //TODO: navigate to details page
    }

    return (
        <View className={"flex-1 px-4 gap-4 bg-white w-full"}>
            <Text className={"text-2xl font-semibold text-center"}>Home</Text>
            <View>
                <Text className={"text-gray-600"}>Selected vehicle</Text>
                <VehicleCard vehicleId={selectedVehicleId ?? ''} name={selectedVehicle?.name ?? ''}
                             brand={selectedVehicle?.make ?? ''} model={selectedVehicle?.model ?? ''} imageUrl={''}
                             onPress={vehicleDetails}
                />
            </View>
            <Text className={"text-2xl font-semibold"}>Upcoming expenses</Text>

        </View>
    )
}