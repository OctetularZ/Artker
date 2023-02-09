import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import colours from '../config/colours'

import { AntDesign } from '@expo/vector-icons'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'

export default function PfpDisplay({ username }) {
  const navigation = useNavigation();

  const [pfpLink, setPfpLink] = useState('');
  const [pfpBool, setpfpBool] = useState(false);

  const db = SQLite.openDatabase('Artker')

  const onAvatarIconPressed = () => {
    navigation.navigate('ImgurL', {usernamePassed: username})
  }

  const ProfilePictureCheck = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT Pfp FROM Profiles WHERE Username = '${username}'`,
      null,
      (txObj, resultSet) => {
        let results = resultSet.rows._array
        if (results.length == 0) {
          console.log('No results')
          setpfpBool(false)
        }
        else{
          let userObj = results[0]
          let userPfp = userObj['Pfp']
          if (userPfp == 'None') {
            console.log('None')
            setpfpBool(false)
          }
          else {
            setPfpLink(userPfp)
            setpfpBool(true)
          }
        }
      },
      (txObj, error) => console.log(error)
      )
    })
  }

  ProfilePictureCheck();

  return (
    <TouchableOpacity style={styles.pfp} onPress={onAvatarIconPressed}>
      {!pfpBool ? <AntDesign name='plus' size={40} color='grey'/> : <Image source={{uri: pfpLink}} style={styles.imagePfp}/>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pfp: {
    height: 200,
    width: 200,
    backgroundColor: colours.secondaryBlack,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: 'black',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 10,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePfp:{
    resizeMode: 'center',
    width: 200,
    height: 200,
    borderRadius: 100
  }
})