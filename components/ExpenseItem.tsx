import React from 'react';
import {View, Text} from 'react-native';
import {ExpenseType} from "@/lib/types";
import {formatExpenseDate} from "@/lib/formatExpenseDate";

type Props = {
    value: number;
    type: ExpenseType;
    date: string;
    mode: "future" | "past";
}

export default function ExpenseItem({value, type, date, mode}: Props) {
    return (
        <View className="flex-row justify-between items-center">
            <View>
                <Text>{value}</Text>
                <Text className={"text-gray-600"}>{type}</Text>
            </View>
            <Text className={"text-gray-600"}>{formatExpenseDate(date, mode)}</Text>
        </View>
    );
}
