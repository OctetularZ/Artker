import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import colours from '../config/colours'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

/*
This function will generate a card-like display where certain types of information will be displayed
to the user. This will be used very commonly as it'll be a method of displaying information.
The card will be cut in half so something can be displayed on the top and the bottom with some disperancy
*/

export default function AppCardsSeparated({HGT, separatorHeight, separatorColour}) { // HGT - The height of the card component, separatorHeight - How much of the card should be designated to the 'second half'
  return ( // separatorColour - What colour the 'second half' should be
    <View>
      <TouchableOpacity style={[styles.cardsStyle, {height: HGT/2, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 0}]}>
        
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cardsStyle, {height: separatorHeight, backgroundColor: separatorColour, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: 0}]}>
        <Text style={styles.header}></Text>
      </TouchableOpacity>
    </View>
  )
} // Returns an AppCards component but separated by a certain amount

const styles = StyleSheet.create({
  cardsStyle: {
    margin: 20,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5
  }
})