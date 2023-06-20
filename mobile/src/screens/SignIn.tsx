import React, {useState, useEffect, useContext} from 'react'
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { AuthContext } from '../contexts/auth';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn }: any = useContext(AuthContext);

    async function handleSignIn(){
        signIn(email, password)  
    }

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='flex items-center '>
                <Text className='mt-2 text-lg font-bold text-white'>LOGIN</Text>
            </View>            
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe seu email'
                    value={email}
                    onChangeText={setEmail}>
                </TextInput>
            </View>
            <View className='mt-4 mr-4 ml-4 p-2 bg-slate-100 rounded-md'>
                <TextInput 
                    className='flex justify-center w-80 items-center text-black ' 
                    placeholder='Informe sua senha' 
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword}>
                </TextInput>
            </View>                        
            <TouchableOpacity onPress={handleSignIn} className='flex justify-center items-center mt-6 mr-4 ml-4 p-3 bg-green-600 rounded-md '>
                <Text className='font-bold text-white'>LOGIN</Text>
            </TouchableOpacity> 
        </View>
    )
}
