import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated'
import colours from '../config/colours'

/*
This function creates a custom button for easy reproduceability. This will mainly be used on the login and signup screens 
and screens related to these screens. Multiple instances of conditions are used to allow/extend functionality.
*/

export default function CustomButton1({ onPress, text, type, bgColour, fgColour, fontSZ, marginLeft }) { // text - Text displayed on the button, type - what type of button will it be, bgColour - Background colour of the button, fgColour - Colour of the button's text, fontSZ - Size of the text's font, marginLeft - How much margin should be added horizonatally to the left if need be
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container${type}`], bgColour ? {backgroundColor: bgColour} : {}, marginLeft ? {marginLeft: marginLeft} : {}]}>
      <Text style={[styles.text, styles[`text${type}`], fgColour ? {color: fgColour} : {}, fontSZ ? {fontSize: fontSZ} : {}]}>{text}</Text>
    </TouchableOpacity>
  )
} // Returns a custom Button component

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5
  },

  containerPrimary: {
    backgroundColor: colours.secondary,
  },
  containerSecondary: {
    borderColor: colours.secondary,
    borderWidth: 2
  },
  containerTertiary: {

  }, // container styles will be applied depending on the 'type' of button
  text: {
    fontWeight: 'bold',
    color: colours.white
  },
  textTertiary: {
    color: 'grey'
  },
  textSecondary: {
    color: colours.white
  } // text styles will be applied depending on the 'type' of button
})