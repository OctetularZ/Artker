import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

import {
  useFonts,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins';

import AppLoading from 'expo-app-loading';


export default function UserFullDisplay({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')

  const db = SQLite.openDatabase('Artker')

  const navigation = useNavigation();

  const [username, setUsername] = useState(usernameDB);
  const [name, setName] = useState(null);
  const [Pfp, setPfp] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [expertises, setExpertises] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM Profiles WHERE Username = '${usernameDB}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        console.log(results)
        if (results.length === 0) {}
        else {
          let userInfo = results[0]
          let pfp = userInfo['Pfp']
          let nationality = userInfo['Nationality']
          let name = userInfo['Name']
          let expertises = userInfo['Expertises']
          let description = userInfo['Description']
          let dob = userInfo['Dob']

          console.log(expertises)

          if (expertises === 'None') {}
          else {
            let firstIndexOfComma = expertises.indexOf(',')
            if (firstIndexOfComma === -1) {}
            else {
              expertises = expertises.substr(0, (firstIndexOfComma - 1))
            }
          }

          setName(name);
          setNationality(nationality);
          setPfp(pfp);
          setDOB(dob);
          setExpertises(expertises);
          setDescription(description);
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  }, []);

  let [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium
    });
  
    if (!fontsLoaded) {
      return <AppLoading />;
    }
    else {
      return (
      <SafeAreaView style={{backgroundColor: colours.primary, alignItems: 'center'}}>
        <View style={{marginRight: 300}}>
          <MaterialIcons.Button name='arrow-back-ios' size={24} color='white' backgroundColor='transparent' style={{paddingHorizontal: 0}}/>
        </View>
        <View style={styles.cardPfpBG}>
          <Image source={{uri: Pfp}} style={styles.cardPfp}/>
        </View>
        <Text style={styles.usernameBelowPfp}>{username}</Text>
        <Text style={styles.nameBelowPfp}>{name}</Text>
        <View style={styles.bottomHalf}>
          <ScrollView style={styles.bottomHalf}>
            <View style={{marginLeft: 20}}>
              <Text style={styles.userDescTitle}>Description:</Text>
              <Text style={styles.userDesc}>{description}</Text>
            </View>
            <View style={{marginLeft: 20, marginTop: 20}}>
              <Text style={styles.userExpTitle}>Expertises:</Text>
              <Text style={styles.userExp}>{expertises}</Text>
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
          </ScrollView>
        </View>
      </SafeAreaView>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  },
  cardPfpBG: {
    height: 200,
    width: 200,
    backgroundColor: colours.secondaryBlack,
    borderRadius: 100,
    marginTop: 15,
    marginBottom: 25,
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 10,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardPfp: {
    resizeMode: 'center',
    width: 200,
    height: 200,
    borderRadius: 100
  },
  bottomHalf: {
    width: '100%',
    height: '100%',
    marginTop: 45,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {height: -10, width: 0},
    shadowRadius: 20,
    shadowOpacity: 0.5
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
    fontSize: 15
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
    marginLeft: 10
  }
})