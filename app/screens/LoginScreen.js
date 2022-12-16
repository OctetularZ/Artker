import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../assets/app_logo_test.png'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const db = SQLite.openDatabase('Artker')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Account (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT, Password TEXT)')
    });
  })

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT Password FROM Account WHERE Username = '${username}'`,
      null,
      (txObj, resultSet) => {
        let results = resultSet.rows._array
        if (results.length == 0) {
          console.log('No results')
        }
        else{
          let userObj = results[0]
          let userPassword = userObj['Password']
          if (userPassword == password) {
            navigation.navigate('Home', { usernamePassed: username })
          }
          else {
            console.log('Wrong Password')
          }
        }
      },
      (txObj, error) => console.log(error)
      )
    })
  }

  const onSignUpPressed = () => {
    navigation.navigate('Register')
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain'/>

        <CustomInput placeholder='Username' value={username} setValue={setUsername}/>
        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>

        <CustomButton1 onPress={onSignInPressed} text='Sign In' type='Primary'/>
        <CustomButton1 onPress={onForgotPasswordPressed} text='Forgot Password?' type='Tertiary'/>

        <View style={styles.bottomButtons}>
          <SocialSignInButtons/>

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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200
  },
  bottomButtons: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  }
})