import {Pressable, Text} from "react-native";
import {clsx} from "clsx";

type Props = {
    onPress?: () => void,
    size?: "sm" | "md" | "lg",
    className?: string,
}

export function Fab({ onPress, size = "md", className }: Props) {
    const sizes = {sm: "w-10 h-10", md: "w-12 h-12", lg: "w-14 h-14"}[size];

    return (
        <Pressable
            onPress={onPress}
            className={clsx(className, sizes, "bg-blue-500 p-4 rounded-full shadow-lg fixed bottom-20 right-4 flex items-center justify-center")}
        >
            <Text className={"text-2xl text-white"}>+</Text>
        </Pressable>
    )
}