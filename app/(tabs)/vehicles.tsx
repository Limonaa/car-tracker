import ListItem from "@/components/ListItem";
import {useAuth} from "@/hooks/useAuth";
import {useVehicles} from "@/hooks/useVehicles";
import {FlatList, View} from "react-native";
import {Link} from "expo-router";

export default function Vehicles() {
    const {user} = useAuth();
    const {vehicles} = useVehicles(user?.id);

    return (
        <View className="flex-1 p-4">
            <FlatList data={vehicles} renderItem={({item}) => (
                <Link href={`/vehicle/${item.id}`} asChild>
                    <ListItem title={item.name} subtitle={`${item.make ?? ''} ${item.model ?? ''}`}/>
                </Link>
            )}
            />
        </View>
    );
}