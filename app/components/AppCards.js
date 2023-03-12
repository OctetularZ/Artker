import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import colours from '../config/colours'

const HEIGHT = Dimensions.get('window').height // Gets the height of the user's screen
const WIDTH = Dimensions.get('window').width // Gets the width of the user's screen

/*
This function will generate a card-like display where certain types of information will be displayed
to the user. This will be used very commonly as it'll be a method of displaying information.
Will be used on the home screen and the UserFullDisplay screen
*/

export default function AppCards({HGT, onPress, children}) { // children is any component passed between the tags of <AppCards/>
  return ( // onPress is the function which will be called when user selects the appcard (or any button) & HGT is for the height of the appcard
    <TouchableOpacity style={[styles.cardsStyle, {height: HGT}]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
} // Returns an AppCard component

const styles = StyleSheet.create({ // Styles contains all the styles used in the screen/component
  cardsStyle: {
    margin: 20,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    borderRadius: 20
  }
})