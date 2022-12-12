import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import colours from '../config/colours'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

/*
This functions will generate a card-like display where certain types of information will be displayed
to the user. This will be used very commonly as it'll be a method of displaying information.
*/

export default function AppCardsSeparated({HGT, separatorHeight, separatorColour}) {
  return (
    <View>
      <TouchableOpacity style={[styles.cardsStyle, {height: HGT/2, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 0}]}>
        
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cardsStyle, {height: separatorHeight, backgroundColor: separatorColour, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: 0}]}>
        <Text style={styles.header}></Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardsStyle: {
    margin: 20,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5
  }
})