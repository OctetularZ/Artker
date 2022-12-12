import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import CustomButton1 from './CustomButton1';

/*

*/

export default function SocialSignInButtons() {

  const onSignInGoogle = () => {
    console.warn('Google');
  }

  const onSignInApple = () => {
    console.warn('Apple');
  }

  const onSignInFacebook = () => {
    console.warn('Facebook');
  }

  return (
    <>
      <CustomButton1 onPress={onSignInGoogle} text='Sign In with Google' bgColour='#fae9ea' fgColour='#dd4d44'/>
      <CustomButton1 onPress={onSignInApple} text='Sign In with Apple' bgColour='#e3e3e3' fgColour='#363636'/>
      <CustomButton1 onPress={onSignInFacebook} text='Sign In with Facebook' bgColour='#e7eaf4' fgColour='#4765a9'/>
    </>
  )
}

const styles = StyleSheet.create({})