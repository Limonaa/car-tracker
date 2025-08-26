import Input from "@/components/Input";
import Button from "@/components/Button";
import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {router} from "expo-router";
import {View} from "react-native";
import {useAuthStore} from "@/lib/authStore";

export default function NewVehicle() {
    const user = useAuthStore((s) => s.user);
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");

    const save = async () => {
        if (!user) return;
        await supabase.from("vehicles").insert({user_id: user.id, name, make, model});
        router.back();
    };

    return (
        <View className={"flex-1 p-4 gap-3"}>
            <Input placeholder="Name (eg. Mazda 2)" value={name} onChangeText={setName}/>
            <Input placeholder="Brand" value={make} onChangeText={setMake}/>
            <Input placeholder="Model" value={model} onChangeText={setModel}/>
            <Button title={"Save"} onPress={save}/>
        </View>
    )
}