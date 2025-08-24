import {TextInput, TextInputProps} from "react-native";

export default function Input(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            className={"border border-gray-200 rounded-2xl px-4 py-3 text-base"}
            placeholderTextColor={"#9ca3af"}
        />
    );
}