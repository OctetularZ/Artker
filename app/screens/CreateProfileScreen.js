import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, Modal, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

import Screen from '../components/Screen'
import colours from '../config/colours'
import CustomInput from '../components/CustomInput'
import CustomButton1 from '../components/CustomButton1'
import PfpDisplay from '../components/PfpDisplay'
import {expertises} from './Expertise'

import {CountryPicker} from "react-native-country-codes-picker";
import AppDate from '../components/AppDate'
import { ScrollView } from 'react-native-gesture-handler'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs } from '../database/dbScripts'
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
  const [modalVisible, setModalVisible] = useState(false); // modalVisible - Holds a boolen value for whether a modal is open or closed
  const [DOB, setDOB] = useState(new Date());
  let expertiseDisplay = '' // Temporary string which holds all the user expertises as a string
  let expertiseList = [] // List for the selected user expertises
  const [skills, setSkills] = useState('Expertises - The first one selected will be your primary expertise and will be displayed on the short-hand of your profile');
  const [country, setCountry] = useState('Nationality');
  const [description, setDescription] = useState(''); // All the other above are holders for the values inputted by the user unless epecified otherwise
  
  const [show, setShow] = useState(false); // show - Holds a boolen value for whether a modal is open or closed

  const [amountX, setAmountX] = useState(0); // amountX - Amount to move the screen on the x-axis
  const [amountY, setAmountY] = useState(0); // amountY - Amount to move the screen on the y-axis

  useEffect(() => {
    let Username = usernameDB
    let Dob = 'none'
    let Description = 'none'
    let Expertises = 'none'
    let Name = 'none'
    let Pfp = 'none'
    let Nationality = 'none'

    fbDB.collection('Profiles').add({Username, Dob, Description, Expertises, Name, Pfp, Nationality})
  }, []) // Adds all the base information to the database (Profiles) for a user

  const textInputFocused = (x, y) => {
    setAmountX(x);
    setAmountY(y);
  } // Changes the value of amountX and amountY

  const FlatlistItem = ({value}) => {
    const [selected, setSelected] = useState(false); // Holds a boolean for whether the user has selected the option in the flatlist or not
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
      expertiseDisplay = expertiseList.join(', ') // The above removes the value of a flatlist item for expertiseList and expertiseDisplay when the user deselects an item
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
    const updateQuery = fbDB.collection('Profiles').where('Username', '==', usernameDB);
    updateQuery.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.update({
        Name: Name,
        Dob: DOB,
        Nationality: country,
        Expertises: skills,
        Description: description
        })
      })
    }) // Updates the values of a user's profile in the 'Profiles' database
    navigation.navigate('StarterScreen', {usernamePassed: usernameDB})
  }

  const onDateChange = (event, selectedDate) => { // event - Holds some information for when the date input changes, selectedDate - The date selected by the user
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
      <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false} contentOffset={{x: amountX, y: amountY}}>
      <Screen style={styles.container}>
        <PfpDisplay username={usernameDB}/>
        <CustomInput placeholder='Name' value={Name} setValue={setName}/>
        <CustomBox placeholder={country} onPress={() => setShow(true)}/>
        <AppDate value={DOB} onDateChange={onDateChange}/>
        <CustomBox placeholder={skills} onPress={() => setModalVisible(true)}/>
        <CustomInput placeholder='Description - Write stuff about you...' value={description} setValue={setDescription} onFocus={() => textInputFocused(0, 350)} onBlur={() => textInputFocused(0, 0)} multiline={true} maxLength={500}/>
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  },
  modalView: { // Styles for the container of a modal
    backgroundColor: colours.primary,
    flex: 1,
    paddingTop: 50,
    paddingLeft: 25
  },
  closeModalButton: {
    paddingBottom: 15
  },
  flatlistItem: { // Styles for the container of a flatlist Item
    marginVertical: 10,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  itemValue: { // Styles of the flatlistem items text
    color: 'white',
    fontFamily: 'Poppins_400Regular'
  },
  checkStyles: {
    marginLeft: 10
  }
})