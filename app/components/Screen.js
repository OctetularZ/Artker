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
} // Returns a Screen component which is basically a safeAreaView but for android as well

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight, // height of the user's mobile status bar
        flex: 1
    }
})