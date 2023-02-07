import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, Modal, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import PfpDisplay from '../components/PfpDisplay'
import {expertises} from './Expertise'

import {CountryPicker} from "react-native-country-codes-picker";
import AppDate from '../components/AppDate'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import CustomBox from '../components/CustomBox'
import {Ionicons, AntDesign} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  useFonts,
  Poppins_400Regular
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading'


export default function CreateProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')

  const navigation = useNavigation();

  const [Name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [DOB, setDOB] = useState(new Date());
  let expertiseDisplay = ''
  let expertiseList = [] // Create flatlist for instruments and make searchable
  const [skills, setSkills] = useState('Expertises');
  const [country, setCountry] = useState('Nationality');
  const [description, setDescription] = useState('');
  
  const [show, setShow] = useState(false); // For modal state
  
  // const db = SQLite.openDatabase('Artker')

  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql('CREATE TABLE IF NOT EXISTS Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, Username TEXT, Name TEXT, Pfp TEXT, Dob TEXT, Nationality TEXT, Expertise TEXT, About TEXT)')
  //   });
  // })

  const FlatlistItem = ({value}) => {
    const [selected, setSelected] = useState(false);
    if (selected) {
      expertiseList.push(value)
      expertiseDisplay = expertiseList.join(', ')
      return(
      <TouchableOpacity style={styles.flatlistItem} onPress={() => {(setSelected(false), console.log(selected))}}>
        <Text style={styles.itemValue}>{value}</Text>
        {selected && <AntDesign name='check' size={24} color='white' style={styles.checkStyles}/>}
      </TouchableOpacity>
    )
    }
  else {
    let index = expertiseList.indexOf(value);
    if (index !== -1) {
      expertiseList.splice(index, 1);
      expertiseDisplay = expertiseList.join(', ')
    }
    return(
      <TouchableOpacity style={styles.flatlistItem} onPress={() => {(setSelected(true), console.log(selected))}}>
        <Text style={styles.itemValue}>{value}</Text>
        {selected && <AntDesign name='check' size={18} color='white'/>}
      </TouchableOpacity>
    )
  }
  }


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

  let [fontsLoaded] = useFonts({
    Poppins_400Regular
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <PfpDisplay username={usernameDB}/>
        <CustomInput placeholder='Name' value={Name} setValue={setName}/>
        <CustomBox placeholder={country} onPress={() => setShow(true)}/>
        <AppDate value={DOB} onDateChange={onDateChange}/>
        <CustomBox placeholder={skills} onPress={() => setModalVisible(true)}/>
        <CustomInput placeholder='Description' value={description} setValue={setDescription}/>
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
            onPress={() => (setModalVisible(!modalVisible), setSkills(expertiseDisplay))}>
            <Ionicons name='close-outline' size={30} color='white'/>
          </Pressable>
          <FlatList
          data={expertises}
          renderItem={({item}) => <FlatlistItem value={item}/>}
          />
        </View>
      </Modal>
    </ScrollView>
    // Navigate to the 'StarterScreen' when done designing
    // Custombutton1 may need to be modified if not in correct position
    )
  }
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
    paddingLeft: 25
  },
  closeModalButton: {
    paddingBottom: 15
  },
  flatlistItem: {
    marginVertical: 10,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  itemValue: {
    color: 'white',
    fontFamily: 'Poppins_400Regular'
  },
  checkStyles: {
    marginLeft: 10
  }
})