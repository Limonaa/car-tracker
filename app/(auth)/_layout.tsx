import React from 'react';
import {SafeAreaView, View} from "react-native";
import {Slot} from "expo-router";

const AuthLayout = () => {
    return (
        <SafeAreaView>
            <Slot />
        </SafeAreaView>
    );
};

export default AuthLayout;