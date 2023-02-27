import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, TouchableHighlight, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';


export default function UserFullDisplay({ route }) {
  const { usernamePassed, userUsernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')
  let usernameApp = JSON.stringify(userUsernamePassed)
  usernameApp = usernameApp.replace(/\\/g, '')
  usernameApp = usernameApp.replace(/"/g, '')

  const db = SQLite.openDatabase('Artker')

  const navigation = useNavigation();

  const [username, setUsername] = useState(usernameDB);
  const [name, setName] = useState(null);
  const [Pfp, setPfp] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [expertises, setExpertises] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [description, setDescription] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM Profiles WHERE Username = '${usernameDB}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {}
        else {
          let userInfo = results[0]
          let pfp = userInfo['Pfp']
          let nationality = userInfo['Nationality']
          let name = userInfo['Name']
          let expertises = userInfo['Expertises']
          let description = userInfo['Description']
          let dobNeedMod = userInfo['Dob']

          let dob = dobNeedMod.substr(4, 11)

          if (expertises === 'None') {}
          else {
            setName(name);
            setNationality(nationality);
            setPfp(pfp);
            setDOB(dob);
            setExpertises(expertises);
            setDescription(description);
          }
        }
      },
      (txObj, error) => console.log(error)
      )
    });
    db.transaction(tx => {
      tx.executeSql(`SELECT Email FROM Account WHERE Username = '${usernameDB}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {
          console.log('No results')
        }
        else {
          let userObj = results[0]
          let userEmail = userObj['Email']
          setEmail(userEmail)
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  }, []);

  const onBackPressed = () => {
    navigation.navigate('Home', {usernamePassed: usernameApp}) // Add both usernames to be passed from home screen then pass back to home screen when navigating
  }

  const onMessagePressed = () => {
    navigation.navigate('Chat', {usernamePassed: usernameApp, otherUsernamePassed: usernameDB}) // Add both usernames to be passed from home screen then pass back to home screen when navigating
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
      <View style={{backgroundColor: colours.primary, alignItems: 'center', flex: 1, paddingTop: 55}}>
        <View style={{marginRight: 300}}>
          <MaterialIcons.Button name='arrow-back-ios' size={24} color='white' backgroundColor='transparent' style={{paddingHorizontal: 0}} onPress={onBackPressed}/>
        </View>
        <View style={styles.cardPfpBG}>
          <Image source={{uri: Pfp}} style={styles.cardPfp}/>
        </View>
        <Text style={styles.usernameBelowPfp}>{username}</Text>
        <Text style={styles.nameBelowPfp}>{name}</Text>
        <View style={styles.bottomHalfView}>
          <ScrollView style={styles.bottomHalfScroll} contentContainerStyle={{alignItems: 'stretch'}}>
            <View style={{marginLeft: 20, marginBottom: 10}}>
              <Text style={styles.userDescTitle}>Description:</Text>
              <Text style={styles.userDesc}>{description}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={{display: 'flex', flexDirection: 'column', marginLeft: 20, marginTop: 20}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Feather name='mail' size={20} color={colours.secondary}/>
                <Text style={styles.userEmail}>{email}</Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', marginLeft: 20, marginTop: 20}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Feather name='music' size={20} color={colours.secondary}/>
                <Text style={styles.userExp}>{expertises}</Text>
              </View>
            </View>
            <View style={{display: 'flex', flexDirection: 'column', marginLeft: 20, marginTop: 20}}>
              <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
                <MaterialIcons name='date-range' size={20} color={colours.secondary}/>
                <Text style={styles.DOBText}>{DOB}</Text>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <AntDesign name='flag' size={20} color={colours.secondary}/>
                <Text style={styles.nationalityText}>{nationality}</Text>
              </View>
            </View>
            <View style={styles.separator}></View>
            <TouchableOpacity style={styles.button} onPress={onMessagePressed}>
              <MaterialIcons name='message' size={20} color='white'/>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            <View style={styles.separator}></View>
            <View style={{height: 30, backgroundColor: colours.secondaryBlack}}></View>
          </ScrollView>
        </View>
      </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary,
    flex: 1
  },
  cardPfpBG: {
    height: 200,
    width: 200,
    backgroundColor: colours.secondaryBlack,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 25,
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 10,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardPfp: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
    borderRadius: 100
  },
  bottomHalfView: {
    width: '100%',
    height: '100%',
    marginTop: 45,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {height: -10, width: 0},
    shadowRadius: 20,
    shadowOpacity: 0.5,
    flex: 1
  },
  bottomHalfScroll: {
    width: '100%',
    height: '100%',
    marginTop: 30,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {height: -10, width: 0},
    shadowRadius: 20,
    shadowOpacity: 0.5,
    flex: 1
  },
  usernameBelowPfp: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontSize: 25
  },
  nameBelowPfp: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },
  userDescTitle: {
    color: colours.secondary,
    fontFamily: 'Poppins_500Medium',
    fontSize: 18
  },
  userDesc: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15
  },
  userExpTitle: {
    color: colours.secondary,
    fontFamily: 'Poppins_500Medium',
    fontSize: 18
  },
  userExp: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    marginLeft: 10
  },
  DOBText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    marginLeft: 10
  },
  nationalityText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10
  },
  userEmail: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    marginLeft: 10
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: colours.secondary,
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: colours.secondary,
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: colours.white,
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginLeft: 5
  }
})