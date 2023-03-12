import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import colours from '../config/colours'

import {
  useFonts,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'; // This is how importing a font looks like

import {
  Montserrat_500Medium
} from '@expo-google-fonts/montserrat';

import AppLoading from 'expo-app-loading'; // This is for if the font fails to load - this will be displayed

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

/*
This functions will generate a card-like display where certain types of information will be displayed
to the user. This will be used very commonly as it'll be a method of displaying information.
However, this AppCard component will be split in half but to allow an image on the top half and a
header and description on the bottom half. 
*/

export default function AppCardsSeparatedDesc({HGT, separatorHeight, separatorColour, headerText, descText, children}) { // HGT, separatorHeight and separatorColour are all the same. (children too)
  let [fontsLoaded] = useFonts({ // headerText - Text for the header/title of the text, descText - Text for the description part of the text
    Montserrat_500Medium,
    Poppins_600SemiBold
  }); // Loads the font onto the app
  
  if (!fontsLoaded) { // Checks if the fonts loaded successfully and returns the AppLoading component (loading screen) if not loaded but returns the main component if the font(s) are loaded successfully
    return <AppLoading />; // Returns a loading screen
  }
  else {
    return (
      <View>
        <TouchableOpacity style={[styles.cardsStyle, {height: HGT/2, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 0, alignItems: 'center', justifyContent: 'center'}]}>
          {children}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.cardsStyle, {height: separatorHeight, backgroundColor: separatorColour, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: 0}]}>
          <Text style={styles.header}>{headerText}</Text>
          <Text style={styles.desc}>{descText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
} // Returns an AppCardSeparatedDescription component

const styles = StyleSheet.create({
  cardsStyle: {
    margin: 20,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5
  },
  header: {
    color: colours.secondary,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
    marginHorizontal: 20,
    textAlign: 'center'
  },
  desc: {
    color: colours.white,
    fontFamily: "Montserrat_500Medium",
    marginHorizontal: 20,
    textAlign: 'center'
  }
})