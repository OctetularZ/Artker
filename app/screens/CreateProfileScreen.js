import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, Modal, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import PfpDisplay from '../components/PfpDisplay'
import InstrumentList from './InstrumentList'

import {CountryPicker} from "react-native-country-codes-picker";
import AppDate from '../components/AppDate'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import CustomBox from '../components/CustomBox'
import {Ionicons} from '@expo/vector-icons'


export default function CreateProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)

  const [Name, setName] = useState('');
  const [Nationality, setNationality] = useState('');
  const [DOB, setDOB] = useState(new Date());
  const [pfp, setPfp] = useState('');
  const [expertise, setExpertise] = useState('');
  
  const [show, setShow] = useState(false);
  const [country, setCountry] = useState('');
  
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

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate)
    setShow(false);
    setDOB(currentDate); // Date must be converted to a suitable format when being worked with
  };

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <PfpDisplay/>
        <CustomInput placeholder='Name' value={Name} setValue={setName}/>
        <CustomBox placeholder='Nationality' onPress={() => setShow(true)}/>
        <AppDate value={DOB} onDateChange={onDateChange}/>
        <CustomButton1 onPress={onCreateProfilePressed} text='Create Profile' type='Primary'/>
      </Screen>
      <CountryPicker
        show={show}
        style={{
          modal: {
            backgroundColor: colours.primary,
            paddingTop: 50,
            flex: 1
          },
          countryButtonStyles: {
            backgroundColor: colours.secondaryBlack
          },
          line: {
            backgroundColor: colours.primary
          },
          countryName: {
            color: 'white'
          },
          dialCode: {
            color: 'white'
          },
          countryMessageContainer: {
            backgroundColor: colours.secondaryBlack
          },
          searchMessageText: {
            color: 'white'
          },
          textInput: {
            backgroundColor: colours.secondaryBlack,
            paddingHorizontal: 25,
            color: 'white'
          }
        }}
        inputPlaceholder={'Select a country:'}
        searchMessage={'Is there a typo? Country not found'}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountry(item['name']['en']);
          setShow(false);
        }}
      />
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