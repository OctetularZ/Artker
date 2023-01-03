import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colours from '../config/colours'

export default function InstrumentList() {
  return (
    <View style={styles.container}>
      <Text>InstrumentList</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    color: colours.primary,
    width: '100%',
    height: '100%'
  }
})