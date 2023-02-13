import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'


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
          setDOB(dob)
          setExpertises(expertises);
          setDescription(description)
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <AntDesign name='arrow-back-ios' size={24} color='white'/>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  }
})