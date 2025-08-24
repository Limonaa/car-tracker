import {useUI} from "@/lib/store";
import {useState} from "react";
import {supabase} from "@/lib/supabase";
import {router} from "expo-router";
import {View} from "react-native";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function NewExpense() {
    const {selectedVehicleId} = useUI();
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'fuel' | 'insurance' | 'service' | 'tax' | 'other'>('fuel');

    const save = async () => {
        if (!selectedVehicleId) return;
        await supabase.from("expenses").insert({
            vehicle_id: selectedVehicleId,
            type: type,
            amount: Number(amount)
        });
        router.back();
    };

    return (
        <View className="flex-1 p-4 gap-3">
            <Input placeholder={"Price"} keyboardType={"decimal-pad"} value={amount} onChangeText={setAmount}/>
            <View className="flex-row gap-2">
                {(['fuel', 'insurance', 'service', 'tax', 'other'] as const).map(t => (
                    <Button key={t} size={"sm"} variant={t === type ? 'primary' : 'secondary'} title={t}
                            onPress={() => setType(t)}/>
                ))}
            </View>
            <Button title={"Save"} onPress={save}/>
        </View>
    )
}
