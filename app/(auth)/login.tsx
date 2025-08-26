import {useState} from 'react';
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
        <View className="flex-1 p-6 gap-4 justify-center">
            <Text className="text-3xl font-bold">Log In</Text>
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none"
                   value={email} onChangeText={setEmail}/>
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
            <Button title="Login" onPress={signIn}/>
            <Link href="/(auth)/register" className="text-gray-600 text-center mt-4">
                Dont have an account? Create one
            </Link>
        </View>
    );
}
