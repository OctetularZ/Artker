import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colours from '../config/colours';

export default function AppDate({ value, onDateChange }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.DOBStyle}>Date of birth:</Text>
      <DateTimePicker mode='date' value={value} themeVariant='dark' style={styles.pickerStyle} onChange={onDateChange}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 116,
    paddingVertical: 15,
    marginVertical: 5
  },
  pickerStyle: {

  },
  DOBStyle: {
    color: '#8a8a8a',
    textAlign: 'center',
    paddingBottom: 10
  }
})