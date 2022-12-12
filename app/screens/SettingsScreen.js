import { Image, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native'
import React, { useState } from 'react'
import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


import Screen from '../components/Screen'


export default function SettingsScreen() {
  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        
      </Screen>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
  },
  dropdownText: {
    fontWeight: 'bold'
  }
})