import { Image, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import * as SQLite from 'expo-sqlite'

import AppCards from '../components/AppCards'
import Screen from '../components/Screen'
import AppCardsSeparated from '../components/AppCardsSeparated'
import AppCardsSeparatedDesc from '../components/AppCardsSeperatedDescription'

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen({ route }) {

  const [id, setID] = useState(null);
  const [usernameDB, setUsernameDB] = useState(null);
  const [name, setName] = useState(null);
  const [Pfp, setPfp] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [expertises, setExpertises] = useState(null);
  const [DOB, setDOB] = useState(null);
  const [description, setDescription] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Lead Singer', value: 'lead_singer'},
    {label: 'Backup Singer', value: 'backup_singer'},
    {label: 'Piano', value: 'piano'},
    {label: 'Drums', value: 'drums'}
  ]);

  const navigation = useNavigation();
  
  const { usernamePassed } = route.params;
  let username = JSON.stringify(usernamePassed)
  username = username.replace(/\\/g, '')
  username = username.replace(/"/g, '')

  const db = SQLite.openDatabase('Artker')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Profiles',
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        let randNumbArr = [];
        for (let i = 0; i < 10; i++) {
          randNumbArr.push(Math.floor((Math.random()) * (results.length)))
        }
        let randUsersArr = [];
        for (const randNumbers of randNumbArr) {
          randUsersArr.push(results[randNumbers])
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  })

  const {width, height} = Dimensions.get('screen')

  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <Screen style={styles.container}>
        <Text style={styles.title}>Artker Logo</Text>
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
          />
        </View>
        <AppCardsSeparatedDesc 
          HGT={750} 
          separator={true} 
          separatorColour={colours.grey} 
          separatorHeight={125}
          headerText='WELCOME TO ARTKER!'
          descText='An application where you can find artists who live around around a desired area and hire them all in the palm of your hands.'
          />
        <AppCards HGT={300}/>
      </Screen>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 50
  },
  dropdownText: {
    fontWeight: 'bold'
  }
})