import { StatusBar, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import Screen from '../components/Screen'
import CustomButton1 from '../components/CustomButton1'
import AppCards from '../components/AppCardsSeparated'

export default function StarterScreen() {

  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('Home')
  }
  
  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <StatusBar translucent backgroundColor={colours.transparent}/>
      <SafeAreaView>
        <AppCards HGT={450}/>
      </SafeAreaView>
      <Screen style={styles.container}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator}/>
          <View style={styles.indicator}/>
          <View style={[styles.indicator, styles.indicatorActive]}/>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.titleStyle}>Tutorial #1</Text>
            <Text style={styles.titleStyle}>More title space</Text>
          </View>
          <View style={{marginTop: 10, marginBottom: 30}}>
            <Text style={styles.descriptionStyle}>Tutorial #1's description and more text test</Text>
            <Text style={styles.descriptionStyle}>More description space</Text>
          </View>
        </View>
        <CustomButton1 onPress={onGetStartedPressed} text='GET STARTED!' type='Primary' fontSZ={18}/>
      </Screen>
    </ScrollView>
  )
}

// Amount of characters in tutorial #1 description is optimal for button to text width ratio

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primary,
    alignItems: 'center'
  },
  indicatorContainer: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    height: 3,
    width: 15,
    backgroundColor: 'grey',
    marginHorizontal: 5,
    borderRadius: 5
  },
  indicatorActive: {
    backgroundColor: colours.secondary
  },
  titleStyleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  titleStyle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colours.white
  },
  descriptionStyle: {
    fontSize: 16,
    color: 'grey'
  },
  textContainer: {
    marginTop: 30
  }
})