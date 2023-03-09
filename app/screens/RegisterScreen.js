import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { oneButtonAlert } from '../components/customAlert'
import { ScrollView } from 'react-native-gesture-handler'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import { db as fbDB } from '../../firebase'
import { getAllData } from '../database/dbScripts'

function containsSpecialChars(str) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

function containsNumbers(str) {
  return /\d/.test(str);
}


export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setpasswordConfirmation] = useState('');

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    getAllData('Account', 'username', username).then((data) => {
      if (data.length == 0) {
        getAllData('Account', 'email', email).then((data) => {
          if (data.length == 0) {
            if (password == passwordConfirmation) {
              if ((containsSpecialChars(password)) && (containsNumbers(password))) {
                if (email.includes('@')) {
                  fbDB.collection('Account').add({username, email, password})
                  navigation.navigate('CreateProfile', {usernamePassed: username})
                }
                else{
                  oneButtonAlert("Email doesn't seem right?", "Please check if you have written your email correctly", 'OK')
                }
              }
              else {
                oneButtonAlert('Invalid Password', "Your password must contain at least one special character and number, i.e. lumoan029@", 'OK')
              }
            }
            else {
              oneButtonAlert('Password are not matching?', "Please check and make sure passwords match", 'OK')
            }
          }
          else {
            oneButtonAlert('Email already exists?', "Check if you have an account with this emaii", 'OK')
          }
        })
      }
      else {
        oneButtonAlert('Username already in use', 'Try entering a different username', 'OK')
      }
    })
  }

  const onSignInPressed = () => {
    navigation.navigate('Login')
  }

  const onTermsOfUsePressed = () => {
    console.log('TermsOfUse')
  }

  const onPrivacyPolicyPressed = () => {
    console.log('PrivacyPolicy')
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        
        <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false}/>
        <CustomInput placeholder='Email' value={email} setValue={setEmail} secureTextEntry={false}/>
        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomInput placeholder='Confirm Password' value={passwordConfirmation} setValue={setpasswordConfirmation} secureTextEntry={true}/>


        <CustomButton1 onPress={onRegisterPressed} text='Register' type='Primary'/>
        <Text style={styles.text}>By registering, you confirm that you accept our <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text></Text>

        <View style={styles.bottomButtons}>
          <SocialSignInButtons/>

          <CustomButton1 onPress={onSignInPressed} text="Already have an account? Sign in" type='Tertiary'/>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colours.secondary,
    margin: 10
  },
  bottomButtons: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60
  },
  text: {
    color: 'grey',
    marginVertical: 10,
    marginHorizontal: 50
  },
  link: {
    color: colours.secondary
  }
})