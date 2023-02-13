import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import StarterScreen from '../screens/StarterScreen';
import AppBottomBarNavigation from '../components/AppBottomBarNavigation';
import ImgurLink from '../components/ImgurLink';
import UserFullDisplay from '../screens/UserFullDisplay';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen}/>
        <Stack.Screen name='Home' component={AppBottomBarNavigation}/>
        <Stack.Screen name='StarterScreen' component={StarterScreen}/>
        <Stack.Screen name='CreateProfile' component={CreateProfileScreen}/>
        <Stack.Screen name='ImgurL' component={ImgurLink}/>
        <Stack.Screen name='UserDisp' component={UserFullDisplay}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})