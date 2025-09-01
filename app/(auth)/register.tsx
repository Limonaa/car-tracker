import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Link, Redirect} from 'expo-router';
import {supabase} from '@/lib/supabase';
import Input from '@/components/Input';
import Button from '@/components/Button';
import {useAuthStore} from "@/lib/authStore";

export default function SignUp() {
    const user = useAuthStore((s) => s.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    if (user) return <Redirect href="/(tabs)"/>;

    const signUp = async () => {
        const {data, error} = await supabase.auth.signUp({
            email, password, options: {data: {full_name: name}}
        });
        if (error) {
            Alert.alert("Error", error.message)
        } else {
            Alert.alert(`Success`, 'Signed up!')
        }
    }

    return (
        <View className={"flex-1 justify-center px-4 gap-4 bg-white w-full"}>
            <Text className={"text-3xl font-semibold text-center"}>Register</Text>
            <Input placeholder="Name" value={name} onChangeText={setName}/>
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none"
                   value={email} onChangeText={setEmail}/>
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
            <Button title="Register" onPress={signUp} textClassName={"text-lg"}/>
            <View className={"flex-row justify-center align-middle mt-4"}>
                <Text className={"text-gray-600 text-center "}>Already have an account? </Text>
                <Link href="/(auth)/login" className="text-blue-500 text-center">
                    Sign in!
                </Link>
            </View>

        </View>
    );
}
