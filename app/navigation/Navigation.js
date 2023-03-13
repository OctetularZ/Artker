import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import HomeScreen from '../screens/HomeScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import StarterScreen from '../screens/StarterScreen';
import AppBottomBarNavigation from '../components/AppBottomBarNavigation';
import ImageLink from '../components/ImageLink';
import UserFullDisplay from '../screens/UserFullDisplay';
import ChatScreen from '../screens/ChatScreen';
import ExpertiseSelected from '../screens/ExpertiseSelected';
import ImageLinkTwo from '../components/ImageLink2';
import EditInfo from '../screens/EditInfo';

const Stack = createStackNavigator(); // Initialises/Creates a stack navigator

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='Home' component={AppBottomBarNavigation}/>
        <Stack.Screen name='StarterScreen' component={StarterScreen}/>
        <Stack.Screen name='CreateProfile' component={CreateProfileScreen}/>
        <Stack.Screen name='ImageL' component={ImageLink}/>
        <Stack.Screen name='UserDisp' component={UserFullDisplay}/>
        <Stack.Screen name='Chat' component={ChatScreen}/>
        <Stack.Screen name='ExpDisp' component={ExpertiseSelected}/>
        <Stack.Screen name='ImageL2' component={ImageLinkTwo}/>
        <Stack.Screen name='EditInfo' component={EditInfo}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})