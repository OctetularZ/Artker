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
import { useNavigation } from '@react-navigation/native'


export default function CreateProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')

  const navigation = useNavigation();

  const [Name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [DOB, setDOB] = useState(new Date());
  let specialities = ''
  const [skills, setSkills] = useState(specialities);
  const [country, setCountry] = useState('Nationality');
  
  const [show, setShow] = useState(false); // For modal state
  
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

  const onBackToRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <PfpDisplay username={usernameDB}/>
        <CustomInput placeholder='Name' value={Name} setValue={setName}/>
        <CustomBox placeholder={country} onPress={() => setShow(true)}/>
        <AppDate value={DOB} onDateChange={onDateChange}/>
        <CustomBox placeholder='Skills' onPress={() => setModalVisible(true)}/>
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
      <CustomButton1 text='Back to Register' onPress={onBackToRegister} type='Tertiary' marginLeft={16}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.closeModalButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name='close-outline' size={35} color='white'/>
          </Pressable>
          <FlatList>

          </FlatList>
        </View>
      </Modal>
    </ScrollView>
    // Navigate to the 'StarterScreen' when done designing
    // Custombutton1 may need to be modified if not in correct position
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  },
  modalView: {
    backgroundColor: colours.primary,
    flex: 1,
    paddingTop: 50,
    paddingLeft: 30
  },
  closeModalButton: {
    paddingBottom: 25
  }
})