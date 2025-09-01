import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Link, Redirect} from 'expo-router';
import {supabase} from '@/lib/supabase';
import Input from '@/components/Input';
import Button from '@/components/Button';
import {useAuthStore} from "@/lib/authStore";

export default function SignIn() {
    const user = useAuthStore((s) => s.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (user) return <Redirect href="/(tabs)"/>;

    const signIn = async () => {
        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) Alert.alert("Error", error.message);
    };

    return (
        <View className={"flex-1 justify-center px-4 gap-4 bg-white w-full"}>
            <Text className={"text-3xl font-semibold text-center"}>Log In</Text>
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none"
                   value={email} onChangeText={setEmail}/>
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
            <Button title="Login" onPress={signIn} textClassName={"text-lg"}/>
            <View className={"flex-row justify-center align-middle mt-4"}>
                <Text className={"text-gray-600 text-center "}>Dont have an account? </Text>
                <Link href="/(auth)/register" className="text-blue-500 text-center">
                    Create one!
                </Link>
            </View>
        </View>
    );
}
