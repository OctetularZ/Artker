import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import SocialSignInButtons from '../components/SocialSignInButtons'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'

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

  const db = SQLite.openDatabase('Artker')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Account (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Email TEXT, Password TEXT)')
    });
  })

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT Username FROM Account WHERE Username = '${username}'`,
      null,
      (txObj, resultSet) => {
        let results = resultSet.rows._array
        if (results.length == 0) {
          db.transaction(tx => {
            tx.executeSql(`SELECT Email FROM Account WHERE Email = '${email}'`,
            null,
            (txObj, resultSet) => {
              let results = resultSet.rows._array
              if (results.length == 0) {
                if (password == passwordConfirmation) {
                  if ((containsSpecialChars(password)) && (containsNumbers(password))) {
                    if (email.includes('@')) {
                      db.transaction(tx => {
                        tx.executeSql(`REPLACE INTO Account (Username, Email, Password) VALUES ('${username}', '${email}', '${password}')`)
                        navigation.navigate('CreateProfile', {usernamePassed: username})
                      })
                    }
                    else{
                      console.log("Email doesn't seem right? Please check if you have written your email correctly.")
                    }
                  }
                  else {
                    console.log('Your password must contain at least one special character and number, i.e. lumoan029@')
                  }
                }
                else {
                  console.log('Passwords are not matching. Please check and make make sure password match.')
                }
      
              }
              else{
                 console.log('Email already exists. You must already have an account. Try logging in.')
               }
              },
              (txObj, error) => console.log(error)
              )
            })
        }
        else{
          console.log('Username has already been taken.')
        }
      },
      (txObj, error) => console.log(error)
      )
    })
  }

  const onSignInPressed = () => {
    navigation.navigate('Login')
  }

  const onTermsOfUsePressed = () => {
    console.warn('TermsOfUse')
  }

  const onPrivacyPolicyPressed = () => {
    console.warn('PrivacyPolicy')
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