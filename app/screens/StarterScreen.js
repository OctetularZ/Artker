import { StatusBar, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Video, AVPlaybackStatus } from 'expo-av';

import Screen from '../components/Screen'
import CustomButton1 from '../components/CustomButton1'
import AppCards from '../components/AppCardsSeparated'

export default function StarterScreen({ route }) {
  const { usernamePassed } = route.params;
  let usernameDB = JSON.stringify(usernamePassed)
  usernameDB = usernameDB.replace(/\\/g, '')
  usernameDB = usernameDB.replace(/"/g, '')

  const video = useRef(null); // Refernce to the video
  const [status, setStatus] = React.useState({}); // Holds the current status of the video (is it paused? how much has the user watched?)
  const [active, setActive] = useState([styles.indicator, styles.indicatorActive]) // Holds the styles used on whether an indicator is active or not
  const [left, setLeft] = useState('true') // Holds a value to indicate whether the user is on the left video, was on the left video or is not

  const video2 = useRef(null);
  const [status2, setStatus2] = React.useState({});
  const [active2, setActive2] = useState([styles.indicator])
  const [middle, setMiddle] = useState('false') // Holds a value to indicate whether the user is on the middle video or not

  const video3 = useRef(null);
  const [status3, setStatus3] = React.useState({});
  const [active3, setActive3] = useState([styles.indicator])
  const [right, setRight] = useState('false') // Holds a value to indicate whether the user is on the right video, was on the right video or is not

  const [scrollOffset, setScrollOffset] = useState(0) // Holds a numerical value for how much of the screen the user has scrolled away from the origin
  const [scrollDirection, setScrollDirection] = useState(null) // Hold a value to indicate which direction the user scrolled the screen

  const onScrollEvent = (event) => {
    let currentOffset = event.nativeEvent.contentOffset.x; // How far the user has scrolled from origin
    let direction = currentOffset > scrollOffset ? 'right' : 'left'; // Which direction the user has scrolled
    setScrollOffset(currentOffset)
    setScrollDirection(direction)
  }

  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('Home', {usernamePassed: usernameDB})
  }

  const scrollIndicator = () => {
    if (active.length === 2) {
      setActive([styles.indicator])
      setActive2([styles.indicator, styles.indicatorActive])
      setLeft('wasTrue')
    }
    else if (active2.length === 2) {
      if (left == 'wasTrue' && scrollDirection == 'right') {
        setActive2([styles.indicator])
        setActive3([styles.indicator, styles.indicatorActive])
        setLeft('false')
        setRight('true')
      }
      else if (right == 'wasTrue' && scrollDirection == 'right') {
        setActive2([styles.indicator])
        setActive3([styles.indicator, styles.indicatorActive])
        setLeft('false')
        setRight('true')
      }
      else {
        setActive2([styles.indicator])
        setActive([styles.indicator, styles.indicatorActive])
        setRight('false')
        setLeft('true')
      }
    }
    else if (active3.length === 2) {
      setActive3([styles.indicator])
      setActive2([styles.indicator, styles.indicatorActive])
      setRight('wasTrue')
    }
  } // Returns different styles on the scroll indicators depending on which was the user scrolled and what videot they are currently on
  
  return (
    <ScrollView style={{backgroundColor: colours.primary}} showsVerticalScrollIndicator={false}>
      <StatusBar translucent backgroundColor={colours.transparent}/>
      <SafeAreaView style={{alignItems: 'center'}}>
        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false} onMomentumScrollBegin={scrollIndicator} onScroll={(event) => {onScrollEvent(event)}} bounces={false}>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: 'https://gdurl.com/WIl1', // Change links then add description and title of videos, then lastly look into loading icon thing for createprofile pfp insert delay and video delay or look for time buffer for the first problem
            }}
            useNativeControls={false}
            resizeMode="contain"
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <Video
            ref={video2}
            style={styles.video}
            source={{
              uri: 'https://gdurl.com/CqCN',
            }}
            useNativeControls={false}
            resizeMode="contain"
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={status => setStatus2(() => status)}
          />
          <Video
            ref={video3}
            style={styles.video}
            source={{
              uri: 'https://gdurl.com/a6ZP',
            }}
            useNativeControls={false}
            resizeMode="contain"
            isLooping
            shouldPlay
            onPlaybackStatusUpdate={status => setStatus3(() => status)}
          />
        </ScrollView>
      </SafeAreaView>
      <Screen style={styles.container}>
        <View style={styles.indicatorContainer}>
          <View style={active}/>
          <View style={active2}/>
          <View style={active3}/>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.titleStyle}>Welcome To Artker!</Text>
            <View style={{backgroundColor: colours.secondary, width: '100%', height: 1, marginTop: 10}}></View>
          </View>
          <View style={{marginTop: 10, marginBottom: 30}}>
            <Text style={styles.descriptionStyle}>Artker is an application which allows musicians</Text>
            <Text style={styles.descriptionStyle}>to display their services so people who are</Text>
            <Text style={styles.descriptionStyle}>interested in such services can negogiate</Text>
            <Text style={styles.descriptionStyle}>and come to an agreement on the price.</Text>
            <Text style={styles.descriptionStyle}>Above are a few examples of the features</Text>
            <Text style={styles.descriptionStyle}>this app entails.</Text>
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
  video: {
    height: 450,
    width: 500,
    marginTop: 20,
    marginBottom: 30,
    marginLeft: -55,
    marginRight: -54
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