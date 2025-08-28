import {View, Text, Image, TouchableOpacity} from "react-native";

type Props = {
    vehicleId: string;
    name: string;
    brand: string;
    model: string;
    imageUrl: string;
    onPress: (id: string) => void;
};

export default function SelectedVehicleCard({
                                                vehicleId,
                                                name,
                                                brand,
                                                model,
                                                imageUrl,
                                                onPress,
                                            }: Props) {
    return (
        <TouchableOpacity
            onPress={() => onPress(vehicleId)}
            className="flex-row items-center p-4 bg-white rounded-2xl shadow-sm"
        >
            <View className="flex-1">
                <Text className="text-base font-semibold">{name}</Text>
                <Text className="text-sm text-gray-500">{brand} {model}</Text>
            </View>

            {/*<Image*/}
            {/*    source={{uri: imageUrl}}*/}
            {/*    className="w-24 h-16 rounded-lg ml-4"*/}
            {/*    resizeMode="cover"*/}
            {/*/>*/}
        </TouchableOpacity>
    );
}
