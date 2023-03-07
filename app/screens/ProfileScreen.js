import { SafeAreaView, useWindowDimensions, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs, getData } from '../database/dbScripts'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons' 
import { useNavigation } from '@react-navigation/native'

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
  const [nationality, setNationality] = useState(null);
  const [userExpertises, setUserExpertises] = useState(null);
  const [description, setDescription] = useState(null);

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
        setUserExpertises(expertises)
        setDescription(description)
      }
    })
  })
    
  const navigation = useNavigation();

  const editButtonPressed = (value) => {
    console.log(value)
    navigation.navigate('EditInfo', {usernamePassed: usernameDB, valueToChange: value})
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
          <TouchableOpacity style={{flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center'}}>
            <MaterialCommunityIcons name='rename-box' size={35} color={colours.secondary}/>
            <Text style={{color: 'white', fontFamily: 'Poppins_500Medium', marginLeft: 15, fontSize: 15}}>Nationality</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: colours.secondary, height: 2, marginTop: 10}}/>
          <TouchableOpacity style={{flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center'}}>
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colours.primary
  }
})