import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'


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
        if (results.length === 0) {}
        else {
          let userInfo = results[0]
          let pfp = userInfo['Pfp']
          let nationality = userInfo['Nationality']
          let name = userInfo['Name']
          let expertises = userInfo['Expertises']
          let description = userInfo['Description']
          let dob = userInfo['Dob']

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
  }, []); //Reduce padding between back icon and pfp

  return (
    <SafeAreaView style={{backgroundColor: colours.primary, alignItems: 'center'}}>
      <View style={{marginRight: 300}}>
        <MaterialIcons.Button name='arrow-back-ios' size={24} color='white' backgroundColor='transparent' style={{paddingHorizontal: 0}}/>
      </View>
      <View style={styles.cardPfpBG}>
        <Image source={{uri: Pfp}} style={styles.cardPfp}/>
      </View>
      <View style={styles.bottomHalf}>
        <ScrollView style={styles.bottomHalf}>
          <Text>eee</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
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
    marginTop: 25,
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
    marginTop: 50,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {height: -10, width: 0},
    shadowRadius: 20,
    shadowOpacity: 0.5
  }
})