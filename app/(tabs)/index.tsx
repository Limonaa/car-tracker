import React from 'react';
import {FlatList, Text, View} from "react-native";
import {useVehicles} from "@/hooks/useVehicles";
import Button from "@/components/Button";
import {useUI} from "@/lib/store";
import {Link} from "expo-router";
import {useAuthStore} from "@/lib/authStore";
import VehicleCard from "@/components/VehicleCard";
import ExpenseItem from "@/components/ExpenseItem";
import {ExpensesComparisonChart} from "@/components/ExpensesComparisonChart";
import {useLoadExpenses} from "@/hooks/useLoadExpenses";
import {useExpenseStore} from "@/lib/expenseStore";
import {useMonthlyExpenses} from "@/hooks/useMonthlyExpenses";
import {Expense} from "@/lib/types";
import {Fab} from "@/components/Fab";

export default function Dashboard() {
    const user = useAuthStore((s) => s.user);
    const {vehicles} = useVehicles(user?.id);
    const {selectedVehicleId, setSelectedVehicleId} = useUI();
    useLoadExpenses();
    const expenses = useExpenseStore((s) => s.expenses);
    const pastExpenses = expenses.filter((e) => new Date(e.date) < new Date());
    const { currentTotal, prevTotal, currentMonth, prevMonth } = useMonthlyExpenses(expenses);

    const selectedVehicle = vehicles?.find((v) => v.id === selectedVehicleId);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const vehicleDetails = () => {
        console.log("vehicle details")
        //TODO: navigate to details page
    }

    function calcExpensesDiff() {
        const percentage = currentTotal / prevTotal;
        if (percentage > 1) {
            return `+${Math.round(percentage * 100) / 100}%`;
        } else return `-${Math.round(percentage * 100) / 100}%`;
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
            <FlatList
                className={"flex-grow-0"}
                data={pastExpenses}
                keyExtractor={(item: Expense) => item.id}
                renderItem={({ item }) => (
                    <ExpenseItem
                        value={item.amount}
                        type={item.type}
                        date={item.date}
                        mode="past"
                    />
                )}
            />
            <Text className={"text-2xl font-semibold"}>Monthly expenses</Text>
            {/*<ExpensesComparisonChart current={currentTotal} previous={prevTotal} currentLabel={monthNames[currentMonth]} prevLabel={monthNames[prevMonth]} />*/}
            <View className={"flex-row justify-around items-center"}>
                <Text>{prevTotal} PLN</Text>
                <Text className={`${calcExpensesDiff().includes("+") ? "text-red-500" : "text-green-500"}`}>{calcExpensesDiff()}</Text>
                <Text>{currentTotal} PLN</Text>
            </View>
            <View className={"w-full items-end"}>
                <Fab onPress={() => console.log("pressed")}/>
            </View>
        </View>
    )
}