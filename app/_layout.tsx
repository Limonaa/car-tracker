import React from 'react';
import { Stack } from "expo-router";
import './globals.css';
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
    return (
        <View className="flex-1 bg-white">
            <StatusBar style={"dark"} />
            <Stack screenOptions={{ headerShown: false }} />
        </View>
    );
};

export default RootLayout;