import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'


export default function CreateProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)

  const [Name, setName] = useState('');
  const [pfp, setPfp] = useState('');
  const [phone, setPhone] = useState('');
  const [expertise, setExpertise] = useState('');
  
  const db = SQLite.openDatabase('Artker')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, pfp TEXT)')
    });
  })


  const onCreateProfilePressed = () => {
    db.transaction(tx => {
      tx.executeSql(`INSERT INTO Profile (Username, ProfileUsername, Pfp, Phone, Rating, Expertise) VALUES ('${usernameDB}', '${Name}')`)
    })
  }


  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <CustomInput placeholder='Name' value={Name} setValue={setName}/>

        <CustomButton1 onPress={onCreateProfilePressed} text='Create Profile' type='Primary'/>
      </Screen>
    </ScrollView>
    // Navigate to the 'StarterScreen' when done designing
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  }
})