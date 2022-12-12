import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function ConfirmEmailScreen() {
  const [code, setCode] = useState('');

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate('StarterScreen');
  }

  const onBackToSignInPressed = () => {
    navigation.navigate('Login');
  }

  const onResendPressed = () => {
    console.warn('Resent')
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Text style={styles.title}>Confirm your Email</Text>
        
        <CustomInput placeholder='Code' value={code} setValue={setCode}/>

        <CustomButton1 onPress={onConfirmPressed} text='Confirm' type='Primary'/>

        <CustomButton1 text='Resend code?' onPress={onResendPressed} type='Secondary'/>

        <CustomButton1 text='Back to Sign In' onPress={onBackToSignInPressed} type='Tertiary'/>
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
    color: 'grey'
  }
})