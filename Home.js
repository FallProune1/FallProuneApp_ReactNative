import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Firebase
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import * as FileSystem from 'expo-file-system';


export default function home({navigation}){
    
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // El usuario ha iniciado sesión
                setNombre(user.displayName);
            } else {
                    // El usuario no ha iniciado sesión
                    // Puedes manejar este caso como mejor te parezca
                }
            });
        }, []);

    const [fileUri, setFileUri] = useState('');
    const [image, setImage] = useState(null);
    const handleSelectPic = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    
    const shareFile = async () => {
        await Sharing.shareAsync(image);
      };
    

    return(
       <View style= {{
        marginTop: 50,
        alignItems: 'center'
       }}>
        <Text style ={{
            
            fontSize: 30,
            fontWeight: 'bold'
        }}>¡Bienvenido {nombre}!</Text>
        <View style = {{
            marginTop: 50,
            alignItems: 'center'
        }}>
            <TouchableOpacity onPress={handleSelectPic}>
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100 }} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSelectPic} style= {{
                marginTop: 20,
                backgroundColor: '#E9E9E9',
                borderColor: 'gray',
                borderWidth: 3,
                height: 60,
                width: 250,
                borderRadius: 20,
                alignItems: 'center',
                padding: 10,
                flexDirection: 'row',
                
            }}> 
            <Text style ={{
                fontSize: 18,
                color: 'gray',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Selecciona una foto  </Text>
            <Ionicons name= 'image-outline' size={30} color={'gray'}></Ionicons>
            </TouchableOpacity>
            
            <TouchableOpacity  onPress={shareFile} style= {{
                marginTop: 20,
                backgroundColor: '#E9E9E9',
                borderColor: 'gray',
                borderWidth: 3,
                height: 80,
                width: 150,
                borderRadius: 20,
                alignItems: 'center',
                padding: 10,
                
            }}>
            <Text style ={{
                fontSize: 18,
                color: 'gray',
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Compartir</Text>
            <Ionicons name= 'share-outline' size={35} color={'gray'}></Ionicons>
            </TouchableOpacity>
        </View>
       </View>
    );
}