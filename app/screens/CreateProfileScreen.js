import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import PfpDisplay from '../components/PfpDisplay'
import InstrumentList from './InstrumentList'

import AppDate from '../components/AppDate'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import CustomBox from '../components/CustomBox'


export default function CreateProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)

  const [Name, setName] = useState('');
  const [Nationality, setNationality] = useState('');
  const [DOB, setDOB] = useState(new Date());
  const [pfp, setPfp] = useState('');
  const [expertise, setExpertise] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  
  // const db = SQLite.openDatabase('Artker')

  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, pfp TEXT)')
  //   });
  // })


  const onCreateProfilePressed = () => {
    db.transaction(tx => {
      tx.executeSql(`INSERT INTO Profile (Username, ProfileUsername, Pfp, Phone, Rating, Expertise) VALUES ('${usernameDB}', '${Name}')`)
    })
  }

  const nationalityPressed = () => {
    return (
      <Modal visible={modalVisible} animationType='slide' onRequestClose={() => {setModalVisible(!modalVisible)}}>
        <InstrumentList/>
      </Modal>
    )
  }


  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <PfpDisplay/>
        <CustomInput placeholder='Name' value={Name} setValue={setName}/>
        <CustomBox placeholder='Nationality' onPress={nationalityPressed}/>
        <AppDate value={DOB}/>
        <CustomButton1 onPress={onCreateProfilePressed} text='Create Profile' type='Primary'/>
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