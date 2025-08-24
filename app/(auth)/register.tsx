import {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Link, Redirect} from 'expo-router';
import {supabase} from '@/lib/supabase';
import {useAuth} from '@/hooks/useAuth';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function SignUp() {
    const {user} = useAuth();
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
        <View className="flex-1 p-6 gap-4 justify-center">
            <Text className="text-3xl font-bold">Register</Text>
            <Input placeholder="Name" value={name} onChangeText={setName}/>
            <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none"
                   value={email} onChangeText={setEmail}/>
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
            <Button title="Sign Up" onPress={signUp}/>
            <Link href="/(auth)/login" className="text-gray-600 text-center mt-4">
                Already have an account? Login
            </Link>
        </View>
    );
}
