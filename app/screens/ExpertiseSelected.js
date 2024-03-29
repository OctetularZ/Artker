import { Image, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs, getData } from '../database/dbScripts'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'

import AppCards from '../components/AppCards'
import Screen from '../components/Screen'
import AppCardsSeparated from '../components/AppCardsSeparated'
import AppCardsSeparatedDesc from '../components/AppCardsSeperatedDescription'
import { expertises } from './Expertise'
import Logo from '../assets/artker_logo.png'

import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';

export default function ExpertiseSelected({ route }) {
    const { usernamePassed, expSelected } = route.params;
    let username = JSON.stringify(usernamePassed)
    username = username.replace(/\\/g, '')
    username = username.replace(/"/g, '')

    const [expertiseSelected, setExpertiseSelected] = useState(expSelected); // expertiseSelected - Holds the expertise selected by the user from the dropdown menu
    const [usernameDB, setUsernameDB] = useState(username);
    const [homeUsersDisplay, setHomeUsersDisplay] = useState([]) // homeUsersDisplay - Holds a list of the user profiles who will be displayed on the screen

    const mappedExpertises = expertises.map((element) => {return ({label: element, value: element})}) // Returns a new array with objects containing a label and value

    const [open, setOpen] = useState(false); // open - holds a boolean value on whether the modal is open or not
    const [value, setValue] = useState(expertiseSelected); // value - Used to store the value selected by the user from the dropdown menu
    const [items, setItems] = useState(mappedExpertises); // items - Holds the values displayed to the user in the dropdown menu

    const navigation = useNavigation();

    const FlatlistItem = ({value}) => {
      let username = value['Username']
      let pfp = value['Pfp']
      let nationality = value['Nationality']
      let name = value['Name']
      let expertises = value['Expertises']
      if (expertises === 'None') {}
      else {
        let firstIndexOfComma = expertises.indexOf(',')
        if (firstIndexOfComma === -1) {}
        else {
          expertises = expertises.substr(0, (firstIndexOfComma)) // Gets the first item from a user's expertise list in Profile DB
        }
      }
      return(
        <AppCards HGT={400} onPress={() => onCardPressed(username)}>
          <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <View style={styles.cardPfpBG}>
              <Image source={{uri: pfp}} style={styles.cardPfp}/>
            </View>
            <Text style={styles.cardUsername}>{username}</Text>
            <Text style={styles.cardName}>{name}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View style={{marginRight: 100, alignItems: 'center'}}>
                <AntDesign name='flag' size={24} color='white'/>
                <Text style={styles.cardTextAfterIcon}>{nationality}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Feather name='music' size={24} color='white'/>
                <Text style={styles.cardTextAfterIcon}>{expertises}</Text>
              </View>
            </View>
          </View>
        </AppCards>
      )
    } // Returns an AppCard component

    const onCardPressed = (username) => {
      navigation.navigate('UserDisp', {usernamePassed: username, userUsernamePassed: usernameDB})
    }

    useEffect(() => {
      getData('Profiles').then((data) => {
        if (data.length === 0) {
          console.log('No results')
        }
        else {
          let filteredArray = [];
          for (let user of data) {
            let userExpertises = user['Expertises']
            if (userExpertises.includes(expertiseSelected)) {
              filteredArray.push(user) // The above filters the array to only include users who have the selected expertise then adds it to a new array
            }
            else {}
          }
          let randNumbArr = [];
          for (let i = 0; i < 10; i++) {
            randNumbArr.push(Math.floor((Math.random()) * (filteredArray.length))) // The above adds random number to a new array
          }
          let randUsersArr = [];
          for (const randNumbers of randNumbArr) {
            randUsersArr.push(filteredArray[randNumbers]) // The above adds a group of random users to a new array
          }
          console.log(randUsersArr)
          randUsersArr = randUsersArr.filter((item, index) => randUsersArr.indexOf(item) === index)
        for (let user of randUsersArr) {
          if (user['Username'] == usernameDB) {
            let index = randUsersArr.indexOf(user);
            randUsersArr.splice(index, 1)
          }
        } // Ensures that the current user of the app isn't included in the random users array
          setHomeUsersDisplay(randUsersArr)
        }
      })
    }, []);

    const onBackPressed = () => {
      navigation.navigate('Home', {usernamePassed: usernameDB})
    }

    const {width, height} = Dimensions.get('screen')

    let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    else {
      if (homeUsersDisplay[0] === undefined) {
        return (
            <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
            <Screen style={styles.container}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10}}>
                <Ionicons name='chevron-back' size={30} color='white' style={{marginRight: 70, marginLeft: 20}} onPress={onBackPressed}/>
                <View style={{alignItems: 'center'}}>
                  <Image source={Logo} style={{width: 50, height: 50, marginLeft: 50}}/>
                </View>
              </View>
              <View style={{paddingHorizontal: 20, shadowColor: 'black', shadowOffset:{height: 0, width: 0}, shadowOpacity:0.4, zIndex: 1, elevation: 1}}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.dropdownOuter}
                  containerStyle={styles.containerStyle}
                  disabledStyle={{opacity: 0.5}}
                  textStyle={styles.dropdownText}
                  labelStyle={styles.labels}
                  theme='DARK'
                  maxHeight={500}
                  onChangeValue={(value) => {navigation.push('ExpDisp', {usernamePassed: usernameDB, expSelected: value})}}
                />
              </View>
                <View style={{height: 200, width: 300, backgroundColor: colours.secondaryBlack, alignItems: 'center', marginHorizontal: 50, marginTop: 50
              , shadowColor: 'black', shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: {height: 0, width: 0}, justifyContent: 'center'}}><Text style={{color: 'white', 
              textAlign: 'center', fontWeight: '500', fontFamily: 'Poppins_500Medium'}}>No one has this expertise yet  :/</Text></View>
            </Screen>
          </ScrollView>
          )
        }
      else {
        return (
        <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
          <Screen style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10}}>
              <Ionicons name='chevron-back' size={30} color='white' style={{marginRight: 70, marginLeft: 20}} onPress={onBackPressed}/>
              <View style={{alignItems: 'center'}}>
                <Image source={Logo} style={{width: 50, height: 50, marginLeft: 50}}/>
              </View>
            </View>
            <View style={{paddingHorizontal: 20, shadowColor: 'black', shadowOffset:{height: 0, width: 0}, shadowOpacity:0.4, zIndex: 1, elevation: 1}}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.dropdownOuter}
                containerStyle={styles.containerStyle}
                disabledStyle={{opacity: 0.5}}
                textStyle={styles.dropdownText}
                labelStyle={styles.labels}
                theme='DARK'
                maxHeight={500}
                onChangeValue={(value) => {navigation.push('ExpDisp', {usernamePassed: usernameDB, expSelected: value})}}
              />
            </View>
              <FlatList
              data={homeUsersDisplay}
              renderItem={({item}) => <FlatlistItem value={item}/>}
              keyExtractor={(item, index) => index.toString()}
              />
          </Screen>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  dropdownText: {
    fontWeight: 'bold'
  },
  cardPfpBG: {
    height: 200,
    width: 200,
    backgroundColor: colours.secondaryBlack,
    borderRadius: 100,
    marginTop: 25,
    marginBottom: 25,
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 10,
    shadowOpacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardPfp: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    borderRadius: 100
  },
  cardUsername: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontSize: 25
  },
  cardName: {
    color: '#e1d9d1',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20
  },
  cardTextAfterIcon: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
  }
})