import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'


export default function CreateProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let username = JSON.stringify(usernamePassed)

  const db = SQLite.openDatabase('Artker')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, pfp TEXT)')
    });
    db.transaction(tx => {
      tx.executeSql(`INSERT INTO Profile (Username) VALUES ('${username}')`)
    })
  })

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        
      </Screen>
    </ScrollView>
    // Navigate to the 'StarterScreen' when done designing
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  }
})