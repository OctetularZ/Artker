import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'

let oneButtonAlert = (title, description, buttonTitle) => { // title - The title of the alert component (displayed in the center in bold), description - description for the alert component, buttonTitle - Text that will be displayed on the button
  Alert.alert(title, description, {
    text: buttonTitle,
    onPress: () => {
      console.log('button pressed') // What will happen the button is pressed
    }
  })
} // Returns a native alert component with only one button hence the name 'oneButtonAlert'

export {oneButtonAlert}