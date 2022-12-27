import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AppDate() {
  return (
    <TouchableOpacity style={styles.container}>
      <DateTimePicker mode='date'/>
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
  }
})