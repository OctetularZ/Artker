import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs } from '../database/dbScripts'


export default function EditInfo({ route }) {
  const { usernamePassed, valueToChange } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')
  let valueToChangeDB = JSON.stringify(valueToChange)
  valueToChangeDB = valueToChangeDB.replace(/\\/g, '')
  valueToChangeDB = valueToChangeDB.replace(/"/g, '')

  const [username, setUsername] = useState(usernameDB)
  const [valueDB, setValueDB] = useState(valueToChangeDB)
  
  const [input, setInput] = useState('');

  const navigation = useNavigation();

  const onSubmit = () => {
    if (valueDB == 'Name') {
      const updateQuery = fbDB.collection('Profiles').where('Username', '==', username);
      updateQuery.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.update({
          Name: input
          })
        })
      })
    }
    else {
      const updateQuery = fbDB.collection('Profiles').where('Username', '==', username);
      updateQuery.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.update({
          Description: input
          })
        })
      })
    }
    navigation.goBack();
  } // Updates the user's name or description based on the whichever one the user selected in the previous screen

  const onBackToProfilePressed = () => {
    navigation.goBack();
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Text style={styles.title}>{valueDB}</Text>
        
        <CustomInput placeholder={valueDB} value={input} setValue={setInput}/>

        <CustomButton1 onPress={onSubmit} text='Submit' type='Primary'/>

        <CustomButton1 text='Back to Profile' onPress={onBackToProfilePressed} type='Tertiary'/>
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
  }
})