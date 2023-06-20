import React, {useState, useEffect, useContext} from 'react'
import {Dimensions, FlatList, ImageBackground, View, Text, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-reanimated-carousel';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import api from '../Services/api';
import { AuthContext } from '../contexts/auth';
import ListService from '../components/ListService';

type Nav = {
    navigate: (value: string) => void;
}

export default function Servicos(){
    const navigation = useNavigation<Nav>();
    const [services, setServices] = useState([]);
    const [candidato, setCandidato] = useState([]);
      
    useEffect(() => {
        
        getData();
        
        api({
            method: 'get',    
            url: `services`,                 
        }).then(function(response) {
            setServices(response.data)
        }).catch(function(error) {
            alert(`Falha no acesso dos serviços! Tente novamente.`);
        })
    
    }, []);

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('auth.conCandidato');
          return jsonValue != null ? setCandidato(JSON.parse(jsonValue)) : alert('erro');
        } catch (e) {
          // error reading value
        }
        alert(candidato);
    };

    return (
        <View className="flex-1 bg-[#16568A]">
            <View className='w-full h-2/3'>
                <ImageBackground className='w-full h-full opacity-50'
                    source={require('../../assets/login.png')}  
                />
            </View>    
            <Text>Candidato: {candidato}</Text>
            <FlatList
                data={services}
                className=''
                numColumns={3}
                renderItem={({ item }) => <ListService data={item} />}
                keyExtractor={(item) => item.srvId}
            />
        </View>
    )
}