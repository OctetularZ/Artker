import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'

/*
Creates a screen for safe area viewing so components don't go out of the screen
*/

export default function Screen({children, style}) { // How you allow other styles to be applied from elsewhere
  return (
    <SafeAreaView style={[styles.screen, style]}>
        {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1
    }
})