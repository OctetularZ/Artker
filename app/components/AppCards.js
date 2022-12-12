import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import colours from '../config/colours'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

/*
This functions will generate a card-like display where certain types of information will be displayed
to the user. This will be used very commonly as it'll be a method of displaying information.
*/

export default function AppCards({HGT}) {
  return (
    <TouchableOpacity style={[styles.cardsStyle, {height: HGT}]}>
        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardsStyle: {
    margin: 20,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    borderRadius: 20
  }
})