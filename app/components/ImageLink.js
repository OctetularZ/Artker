import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'

import Screen from './Screen'
import colours from '../config/colours'
import CustomInput from './CustomInput'
import CustomButton1 from './CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import { oneButtonAlert } from './customAlert'
import { useNavigation } from '@react-navigation/native'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs } from '../database/dbScripts'


export default function ImageLink({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')
  
  const [link, setLink] = useState(''); // link - holds the current text in the text input, setLink - used to update the value of link

  const navigation = useNavigation();

  const isUrl = (URLstring) => { // From: https://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(URLstring); // Returns a boolean value
  } // This function is used to check whether a piece of text is a URL or not

  const onSubmit = () => {
    if (isUrl(link)) {
      const updateQuery = fbDB.collection('Profiles').where('Username', '==', usernameDB);
      updateQuery.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.update({
          Pfp: link
          }) // This updates the user's profile picture link in the database
        })
      })
      navigation.navigate('CreateProfile', { usernamePassed: usernameDB }); // Navigates the user to the screen in the first arguement and passes the object in the second argument to the next screen
    }
    else {
      oneButtonAlert('Invalid link', 'Try entering a different link', 'OK')
    }
  }

  const onBackToProfilePressed = () => {
    navigation.navigate('CreateProfile', { usernamePassed: usernameDB });
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Text style={styles.title}>Image Link</Text>
        
        <CustomInput placeholder='Link' value={link} setValue={setLink}/>

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