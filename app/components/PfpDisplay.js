import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colours from '../config/colours'

export default function PfpDisplay() {
  return (
    <TouchableOpacity style={styles.pfp}>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pfp: {
    height: 200,
    width: 200,
    backgroundColor: colours.secondaryBlack,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 10,
    shadowOpacity: 0.2
  }
})