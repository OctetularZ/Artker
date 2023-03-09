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

    const [expertiseSelected, setExpertiseSelected] = useState(expSelected);
    const [usernameDB, setUsernameDB] = useState(username);
    const [homeUsersDisplay, setHomeUsersDisplay] = useState([])

    const mappedExpertises = expertises.map((element) => {return ({label: element, value: element})})

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(expertiseSelected);
    const [items, setItems] = useState(mappedExpertises);

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
          expertises = expertises.substr(0, (firstIndexOfComma))
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
    }

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
              filteredArray.push(user)
            }
            else {}
          }
          let randNumbArr = [];
          for (let i = 0; i < 10; i++) {
            randNumbArr.push(Math.floor((Math.random()) * (filteredArray.length)))
          }
          let randUsersArr = [];
          for (const randNumbers of randNumbArr) {
            randUsersArr.push(filteredArray[randNumbers])
          }

          randUsersArr = randUsersArr.filter((item, index) => randUsersArr.indexOf(item) === index)
        for (let user of randUsersArr) {
          if (user['Username'] == usernameDB) {
            let index = randUsersArr.indexOf(user);
            randUsersArr.splice(index, 1)
          }
        }
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