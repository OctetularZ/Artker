import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import colours from '../config/colours'

/*
This function will be used to take inputs from the users and will mainly be used on the login and signup screens,
and screens related to those. Security is also used on the password to ensure safety (password is blocked out).
*/

export default function CustomInput({value, setValue, placeholder, secureTextEntry, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TextInput value={value} onChangeText={setValue} placeholder={placeholder} style={styles.input} secureTextEntry={secureTextEntry} placeholderTextColor='grey'/>
    </TouchableOpacity>
  )
}

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
  input: {
    color: '#e8e8e8'
  }
})