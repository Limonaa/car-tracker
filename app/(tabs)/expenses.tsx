import {useUI} from "@/lib/store";
import {useExpenses} from "@/hooks/useExpenses";
import {FlatList, Text, View} from "react-native";
import ListItem from "@/components/ListItem";
import {currency} from "@/lib/format";
import {Link} from "expo-router";

export default function Expenses() {
    const {selectedVehicleId} = useUI();
    const {expenses} = useExpenses();

    return (
        <View className="flex-1 p-4">
            {!selectedVehicleId ? (
                <Text className={"text-gray-500"}>Select vehicle in dashboard</Text>
            ) : (
                <FlatList data={expenses} renderItem={({item}) => (
                    <ListItem title={`${item.type.toUpperCase()} * ${currency(item.amount, item.currency)}`}
                              subtitle={new Date(item.date).toLocaleDateString('pl-PL')}/>
                )}
                          ListFooterComponent={
                              <Link href={"/expense/new"} asChild>
                                  <Text className={"mt-4 text-brand"}>Add expense</Text>
                              </Link>
                          }
                />
            )}
        </View>
    )
}