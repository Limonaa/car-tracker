import {clsx} from "clsx";
import {Pressable, Text} from "react-native";

type Props = {
    title: string;
    onPress?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
};

export default function Button({title, onPress, variant = "primary", size = "md", className}: Props) {
    const base = "rounded-2xl px-4 py-3 items-center"
    const sizes = {sm: "px-3 py-2", md: "px-4 py-3", lg: "px-5 py-4"}
    const variants = {
        primary: "bg-brand active:bg-brand-dark",
        secondary: "bg-gray-100",
        ghost: "bg-transparent",
    }[variant];
    const text = clsx("font-semibold", variant === "secondary" ? "text-gray-800" : "text-white");
    return (
        <Pressable onPress={onPress} className={clsx(base, sizes, variants, className)}>
            <Text className={text}>{title}</Text>
        </Pressable>
    )
}