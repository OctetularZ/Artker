import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


export default function ImgurLink({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  
  const [link, setLink] = useState('');

  const navigation = useNavigation();

  const onSubmit = () => {
    console.log('Put imgur link into database and substitute icon in createprofilescreen for the imgur picture')
    navigation.navigate('CreateProfile', { usernameHere: usernameDB });
  }

  const onBackToProfilePressed = () => {
    navigation.navigate('CreateProfile', { usernameHere: usernameDB });
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Text style={styles.title}>Imgur Link</Text>
        
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
    color: colours.menuColour
  }
})