import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import colours from '../config/colours'

/*
This function will be used to take inputs from the users and will mainly be used on the login and signup screens,
and screens related to those.
*/

export default function CustomBox({placeholder, onPress}) { // placeholder - The text which will be used as a placeholder when nothing has been selected/inputted
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.placeholderText}>{placeholder}</Text>
    </TouchableOpacity>
  )
} // Returns a CustomBox component

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
    width: '90%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5
  },
  placeholderText: {
    color: 'grey',
    overflow: 'visible'
  }
})