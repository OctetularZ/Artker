import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import colours from '../config/colours'

import { AntDesign } from '@expo/vector-icons'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs } from '../database/dbScripts'
import { useNavigation } from '@react-navigation/native'

export default function PfpDisplay({ username }) {
  const navigation = useNavigation();

  const [pfpLink, setPfpLink] = useState('');
  const [pfpBool, setpfpBool] = useState(false);

  const onAvatarIconPressed = () => {
    navigation.navigate('ImgurL', {usernamePassed: username})
  }

  const ProfilePictureCheck = () => {
    getAllData('Profiles', 'Username', username).then((data) => {
      if (data.length == 0) {
        console.log('No results')
        setpfpBool(false)
      }
      else {
        let userPfp = data[0]['Pfp']
        if (userPfp == 'none') {
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
    resizeMode: 'contain',
    width: 200,
    height: 200,
    borderRadius: 100
  }
})