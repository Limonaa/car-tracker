import {Pressable, Text, View} from "react-native";
import {text} from "node:stream/consumers";

type Props = {
    title: string;
    subtitle?: string;
    onPress?: () => void;
}

export default function ListItem({title, subtitle, onPress}: Props) {
    return (
        <Pressable onPress={onPress} className={"flex-row items-center justify-between py-3 border-b border-gray-100"}>
            <View>
                <Text className={"font-medium"}>{title}</Text>
                {subtitle ? <Text className={"text-gray-500"}>{subtitle}</Text> : null}
            </View>
        </Pressable>
    )
}