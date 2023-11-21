import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Keyboard} from 'react-native';

//Firebase
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Inicio = ({navigation}) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const handleCreateAccount = () =>{
    
    

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            console.log('Acount created')
            const user= userCredential.user;
            console.log(user);
            const profile = { displayName: username }; 
            updateProfile(user, profile)
            Alert.alert("Cuenta creada")
            navigation.navigate('home');
            
        })
        .catch(error =>{
            console.log(error)
            Alert.alert(error.message)

        })
  }

  const handleLogIn = () =>{
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>{
            console.log('Signed up')
            const user = userCredential.user;
            console.log(user);
            Alert.alert("Ha iniciado sesión con exito, bienvenido")
            navigation.navigate('home')
        })
        .catch(error =>{
            console.log(error)
            Alert.alert(error.message)
        })
  }

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle= {styles.container}>
            <KeyboardAvoidingView></KeyboardAvoidingView>
            <Text style = {styles.Title1}> Bienvenido a Fallproune my pana</Text>
            <Text styles = {styles.Title2}>@fallproune en Youtube</Text>      
            <Text style= {{
                marginBottom: 50
            }}>@fallproune_e en Instagram</Text>
            <Text style= {{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: '18'
            }}>Nombre de usuario</Text>
            <TextInput onChangeText={(text)=> setUsername(text)} placeholder='Ingresa tu nombre de usuario' style = {styles.TextInput} ></TextInput>
            <Text style= {{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: '18'
            }}>Correo electrónico</Text>
            <TextInput onChangeText={(text)=> setEmail(text)} placeholder='Ingresa tu correo electrónico' style = {styles.TextInput} keyboardType='email-address'></TextInput>
            <Text style= {{
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: '18'
            }}>Contraseña</Text>
            <TextInput onChangeText={(text)=> setPassword(text)} placeholder='Ingresa tu contraseña' secureTextEntry= {true} style = {styles.TextInput} keyboardType='visible-password'></TextInput>
            <TouchableOpacity  onPress={handleCreateAccount} style = {{
                backgroundColor: '#E9E9E9',
                height: 60,
                borderRadius: 20,
                borderWidth: 2,
                width: 200,
                padding: 15,
                alignItems:'center',
                marginTop: 0,
                flexDirection: 'row'
            }}><Text style= {{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Crear Cuenta  </Text>
            <Ionicons name= "person-add-outline" size={25}></Ionicons></TouchableOpacity>
            <TouchableOpacity  onPress={handleLogIn} style = {{
                backgroundColor: '#E9E9E9',
                height: 60,
                borderRadius: 20,
                borderWidth: 2,
                width: 200,
                padding: 15,
                alignItems:'center',
                marginTop: 10,
                flexDirection: 'row'
            }}><Text style= {{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>Iniciar Sesion  </Text>
            <Ionicons name= "log-in-outline" size={25}></Ionicons></TouchableOpacity>
            <StatusBar style="auto" />
        </ScrollView>
      
    </View>
    //@fallproune_e en Instagram
  );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Title1: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold'
    },
    Title2: {
      fontSize: 10,
      marginBottom: 20,
      fontWeight: '500'
    },
  
    TextInput: {
      height: 50,
      width: 300,
      marginBottom: 20,
      marginTop: 0,
      borderRadius: 20,
      padding: 15,
      borderColor: 'black',
      borderWidth: 2
    },
    
  
  });

export default Inicio;