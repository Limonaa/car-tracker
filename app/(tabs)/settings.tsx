import React from 'react';
import {Text, View} from "react-native";
import Button from "@/components/Button";
import {supabase} from "@/lib/supabase";

export default function Settings() {
    return (
        <View className={"flex-1 p-4 gap-3"}>
            <Text>Settings</Text>
            <Button title={"Logout"} onPress={() => supabase.auth.signOut()}/>
        </View>
    );
};