import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import {expertises} from './Expertise'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs, getData } from '../database/dbScripts'
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons' 
import { useNavigation } from '@react-navigation/native'
import {CountryPicker} from "react-native-country-codes-picker";
import CustomInput from '../components/CustomInput'

import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';


export default function ProfileScreen({ route }) {
  const { usernamePassed } = route.params;
  let username = JSON.stringify(usernamePassed)
  username = username.replace(/\\/g, '')
  username = username.replace(/"/g, '')

  const [usernameDB, setUsernameDB] = useState(username);
  const [name, setName] = useState(null);
  const [Pfp, setPfp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nationality, setNationality] = useState('')
  let expertiseDisplay = ''
  let expertiseList = []
  const [description, setDescription] = useState('');
  
  const [show, setShow] = useState(false); // For modal state

  useEffect(() => {
    getAllData('Profiles', 'Username', usernameDB).then((data) => {
      if (data.length === 0) {
        console.log('No results')
      }
      else {
        let userInfo = data[0]
        let name = userInfo['Name']
        let pfp = userInfo['Pfp']
        let nationality = userInfo['Nationality']
        let expertises = userInfo['Expertises']
        let description = userInfo['Description']

        setName(name)
        setPfp(pfp)
        setNationality(nationality)
        setDescription(description)
      }
    })
  })
    
  const navigation = useNavigation();

  const editButtonPressed = (value) => {
    console.log(value)
    navigation.navigate('EditInfo', {usernamePassed: usernameDB, valueToChange: value})
  }

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

  const addCountryToDB = (countryPassed) => {
    const updateQuery = fbDB.collection('Profiles').where('Username', '==', usernameDB);
    updateQuery.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.update({
        Nationality: countryPassed
        })
      })
    })
  }

  const addExpertisesToDB = (expertisesPassed) => {
    const updateQuery = fbDB.collection('Profiles').where('Username', '==', usernameDB);
    updateQuery.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.update({
        Expertises: expertisesPassed
        })
      })
    })
  }

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'column', marginTop: 80, shadowColor: 'black', shadowOpacity: 0.8, shadowOffset: {width: 0, height: 0}, shadowRadius: 10}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: colours.secondary, fontFamily: 'Poppins_500Medium', fontSize: 30, marginBottom: 30, marginTop: -20}}>Profile</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('ImgurL2', {usernamePassed: usernameDB})}}>
              <Image source={{uri: Pfp}} style={{width: 200, height: 200, borderRadius: 100}}/>
            </TouchableOpacity>
            <Text style={{color: 'white', fontFamily: 'Poppins_500Medium', fontSize: 22, marginTop: 15, textDecorationLine: 'underline'}}>{usernameDB}</Text>
          </View>
          <View style={{backgroundColor: colours.secondary, height: 2, marginTop: 50}}/>
          <TouchableOpacity onPress={() => editButtonPressed('Name')} style={{flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center'}}>
            <MaterialCommunityIcons name='rename-box' size={35} color={colours.secondary}/>
            <Text style={{color: 'white', fontFamily: 'Poppins_500Medium', marginLeft: 15, fontSize: 15}}>Name</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colours.secondary, height: 2, marginTop: 10}}/>
          <TouchableOpacity onPress={() => {setShow(true)}} style={{flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center'}}>
            <MaterialCommunityIcons name='rename-box' size={35} color={colours.secondary}/>
            <Text style={{color: 'white', fontFamily: 'Poppins_500Medium', marginLeft: 15, fontSize: 15}}>Nationality</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colours.secondary, height: 2, marginTop: 10}}/>
          <TouchableOpacity onPress={() => {setModalVisible(true)}} style={{flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center'}}>
            <MaterialCommunityIcons name='rename-box' size={35} color={colours.secondary}/>
            <Text style={{color: 'white', fontFamily: 'Poppins_500Medium', marginLeft: 15, fontSize: 15}}>Expertises</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colours.secondary, height: 2, marginTop: 10}}/>
          <TouchableOpacity onPress={() => editButtonPressed('Description')} style={{flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center'}}>
            <MaterialCommunityIcons name='rename-box' size={35} color={colours.secondary}/>
            <Text style={{color: 'white', fontFamily: 'Poppins_500Medium', marginLeft: 15, fontSize: 15}}>Description</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colours.secondary, height: 2, marginTop: 10}}/>
        </View>
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
            let Nationality = item['name']['en'];
            addCountryToDB(Nationality)
            setShow(false);
          }}
        />
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
              onPress={() => (setModalVisible(!modalVisible), addExpertisesToDB(expertiseDisplay))}>
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