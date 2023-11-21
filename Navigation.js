import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import home from './Home';

const Stack = createNativeStackNavigator();

export default function MyNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="home" component={home} />
        </Stack.Navigator>
    </NavigationContainer>
    
  );
}