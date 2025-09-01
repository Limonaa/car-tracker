import {Text, View} from "react-native";

type Props = {
    current: number;
    previous: number;
    currentLabel: string;
    prevLabel: string;
}

export function ExpensesComparisonChart({ current, previous, currentLabel, prevLabel }: Props) {
    const max = Math.max(current, previous, 1);
    const barHeight = (value: number) => (value / max) * 150;

    return (
        <View className="flex-row justify-around items-end mx-4">
            <View className="items-center">
                <View className={`w-10 h-[${barHeight(previous)}px] bg-[#aaa] rounded-xl`}>
                    <Text>{prevLabel}</Text>
                    <Text>{previous} zł</Text>
                </View>
            </View>

            <View className="items-center">
                <View className={`w-10 h-[${barHeight(current)}px] bg-[#4caf50] rounded-xl`}>
                    <Text>{currentLabel}</Text>
                    <Text>{current} zł</Text>
                </View>
            </View>
        </View>
    )
}