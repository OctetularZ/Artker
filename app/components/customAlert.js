import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'

let oneButtonAlert = (title, description, buttonTitle) => {
  Alert.alert(title, description, {
    text: buttonTitle,
    onPress: () => {
      console.log('button pressed')
    }
  })
}

export {oneButtonAlert}