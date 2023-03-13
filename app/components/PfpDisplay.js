import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import colours from '../config/colours'

import { AntDesign } from '@expo/vector-icons'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs } from '../database/dbScripts'
import { useNavigation } from '@react-navigation/native'

export default function PfpDisplay({ username }) { // username - Whose profile picutre will be retreived from the database
  const navigation = useNavigation();

  const [pfpLink, setPfpLink] = useState(''); // pfpLink - Current input of a text input
  const [pfpBool, setpfpBool] = useState(false); // pfpBool - Holds a boolean for whether the user has a profile picture set or not

  const onAvatarIconPressed = () => {
    navigation.navigate('ImageL', {usernamePassed: username})
  }

  const ProfilePictureCheck = () => {
    getAllData('Profiles', 'Username', username).then((data) => {
      if (data.length == 0) {
        console.log('No results')
        setpfpBool(false)
      }
      else {
        let userPfp = data[0]['Pfp'] // Gets the link of the user's profile picture
        if (userPfp == 'none') { // Also checks if the user has set a profile picture or not
          console.log('None')
          setpfpBool(false)
        }
        else {
          setPfpLink(userPfp)
          setpfpBool(true)
        }
      }
    })
  }

  ProfilePictureCheck();

  return (
    <TouchableOpacity style={styles.pfp} onPress={onAvatarIconPressed}>
      {!pfpBool ? <AntDesign name='plus' size={40} color='grey'/> : <Image source={{uri: pfpLink}} style={styles.imagePfp}/>}
    </TouchableOpacity>
  )
} // Returns a PfpDisplay component

const styles = StyleSheet.create({
  pfp: { // Styles for the background of the pfp
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
  imagePfp:{ //Styles for the pfp image
    resizeMode: 'contain',
    width: 200,
    height: 200,
    borderRadius: 100
  }
})