import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import colours from '../config/colours'

/*
This function will be used to take inputs from the users and will mainly be used on the login and signup screens,
and screens related to those. Security is also used on the password to ensure safety (password is blocked out).
Validation is also put on these inputs via the functions passed into onPress
*/

export default function CustomInput({value, setValue, placeholder, secureTextEntry, onPress, onFocus, onBlur, multiline, maxLength}) { // value - Current value of the text Input, setValue - Used to change the value of the text Input, placeholder - The text which will be used a placeholder when no input has been passed
  return ( // secureTextEntry - Whether the input will be treated as confidential information or not, onPress - Function triggered when text input is pressed, onFocus - Function triggered when the text input is focused (similar to pressed), onBlur - Function triggered when the user clicks off the text input (opposite of onFocus), multiline - Whether the text input can be displayed on multiple lines or not, maxLength - How long the text in the text input is allowed to be
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TextInput value={value} onChangeText={setValue} placeholder={placeholder} style={styles.input} secureTextEntry={secureTextEntry} placeholderTextColor='grey' onFocus={onFocus} onBlur={onBlur} multiline={multiline} maxLength={maxLength}/>
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
  } // Colour of the text in the textInput when the user is typing
})