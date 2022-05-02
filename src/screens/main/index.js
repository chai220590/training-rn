import React from 'react';
import LoginScreen from '../login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../home';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
  return (
    <>
    <SafeAreaView
      style={{
        flex: 0,
        backgroundColor:"#2E86C1",
      }}></SafeAreaView>
      <SafeAreaView
      style={{
        flex: 1,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </>
  );
};
export default MainScreen;
