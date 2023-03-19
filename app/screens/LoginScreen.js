import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../assets/artker_logo.png'

import Screen from '../components/Screen'
import { oneButtonAlert } from '../components/customAlert'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { getAllData } from '../database/dbScripts'


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); //Holds the current password input in the text input

  const {height} = useWindowDimensions(); // Gets height of the user's screens
  const navigation = useNavigation();

  const onSignInPressed = () => {
    getAllData('Account', 'username', username).then((data) => {
      if (data.length == 0) {
        oneButtonAlert('Account not found', 'Invalid username or password', 'OK') // Returns an alert on the user's screen if the account (username) doesn't exist in the database
      }
      else{
        let userPassword = data[0]['password']
        if (userPassword == password) {
          navigation.navigate('Home', { usernamePassed: username }) // The user is navigated to the home screen if the password matches the username specified in the text input as in the database
        }
        else {
          oneButtonAlert('Wrong Password', 'Try entering a different password', 'OK') // Returns an alert if the password is wrong
        }
      }
    })
  } // This function authenicates the user to ensure they have an account in the database and if they do, they must enter the correct password.

  const onSignUpPressed = () => {
    navigation.navigate('Register')
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        
        <Image source={Logo} style={[styles.logo, {height: 125, marginBottom: 60, marginTop: 35}]} resizeMode='contain'/>

        <CustomInput placeholder='Username' value={username} setValue={setUsername}/>
        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>

        <CustomButton1 onPress={onSignInPressed} text='Sign In' type='Primary'/>

        <View style={styles.bottomButtons}>
          <CustomButton1 onPress={onSignUpPressed} text="Don't have an account? Create one" type='Tertiary'/>
        </View>
      </Screen>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  },
  logo: { // Styles used on the logo
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
  },
  bottomButtons: { // Styles used on the buttons at the bottom of the screen
    width: '100%',
    alignItems: 'center'
  }
})