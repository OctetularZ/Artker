import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { useNavigation } from '@react-navigation/native'
import { Entypo, Feather, AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import colours from '../config/colours';

const Bar = createMaterialBottomTabNavigator();

/*
This function contains a template which will be used to create a bottom tab navigator in which users can navigate and
move between screens. A nice animation is added (shifting) and labels and icons are also added for a better/more
modern user experience. This will be displayed on almost every screen, as it's the way to navigate between screens after
logging in/signing up.
*/

export default function AppBottomBarNavigation({ route }) {
  const { usernamePassed } = route.params;
  let username = JSON.stringify(usernamePassed)
  username = username.replace(/\\/g, '')
  username = username.replace(/"/g, '')

  const navigation = useNavigation();

  return (
      <Bar.Navigator shifting={true} activeColor={colours.secondary} inactiveColor={colours.secondary} barStyle={styles.bottomBar}>
        <Bar.Screen name="Home" component={HomeScreen} initialParams={{ usernamePassed: username }} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Entypo name='home' size={24} color={color}/>
          )
        }}/>
        <Bar.Screen name="Profile" component={ProfileScreen} initialParams={{ usernamePassed: username }} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account-box' size={24} color={color}/>
          )
        }}/>
      </Bar.Navigator>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.8
  }
})

