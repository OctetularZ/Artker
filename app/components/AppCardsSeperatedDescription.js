import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import colours from '../config/colours'

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

/*
This functions will generate a card-like display where certain types of information will be displayed
to the user. This will be used very commonly as it'll be a method of displaying information.
*/

export default function AppCardsSeparatedDesc({HGT, separatorHeight, separatorColour, headerText, descText}) {
  return (
    <View>
      <TouchableOpacity style={[styles.cardsStyle, {height: HGT/2, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 0}]}>
        
      </TouchableOpacity>
      <TouchableOpacity style={[styles.cardsStyle, {height: separatorHeight, backgroundColor: separatorColour, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: 0}]}>
        <Text style={styles.header}>{headerText}</Text>
        <Text style={styles.desc}>{descText}</Text>
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
  },
  header: {
    color: colours.secondary,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20
  },
  desc: {
    color: colours.white,
    fontWeight: '500',
    marginHorizontal: 20
  }
})