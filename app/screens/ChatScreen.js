import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { GiftedChat, InputToolbar, Send, Bubble } from 'react-native-gifted-chat'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs, getData } from '../database/dbScripts'
import { getBottomSpace } from 'react-native-iphone-x-helper'

//Add navigation to replace to ensure users can't slide screen back
// navigation.canGoback to check if user has a back button or not then you can replace screen as above

export default function ChatScreen({ route }) {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);

  const { usernamePassed, otherUsernamePassed } = route.params;
  let usernameApp = JSON.stringify(usernamePassed)
  usernameApp = usernameApp.replace(/\\/g, '')
  usernameApp = usernameApp.replace(/"/g, '')
  let recpientUsername = JSON.stringify(otherUsernamePassed)
  recpientUsername = recpientUsername.replace(/\\/g, '')
  recpientUsername = recpientUsername.replace(/"/g, '')

  const [username, setUsername] = useState(usernameApp);
  const [name, setName] = useState(null);
  const [Pfp, setPfp] = useState(null);
  const [email, setEmail] = useState(null);

  const [receiverUsername, setReceiverUsername] = useState(recpientUsername);
  const [receivername, setReceiverName] = useState(null);
  const [receiverPfp, setReceiverPfp] = useState(null);
  const [receiveremail, setReceiverEmail] = useState(null);

  useEffect(() => {
    getAllData('Profiles', 'Username', username).then((data) => {
      if (data.length === 0) {}
      else{
        let userInfo = data[0]
        let pfp = userInfo['Pfp']
        let name = userInfo['Name']

        setName(name);
        setPfp(pfp);
      }
    });
    getAllData('Account', 'username', username).then((data) => {
      if (data.length === 0) {
        console.log('No results')
      }
      else{
        let userEmail = data[0]['email']
        setEmail(userEmail)
      }
    });
  }, []);

  useEffect(() => {
    getAllData('Profiles', 'Username', receiverUsername).then((data) => {
      if (data.length === 0) {}
      else{
        let userInfo = data[0]
        let pfp = userInfo['Pfp']
        let name = userInfo['Name']

        setReceiverName(name);
        setReceiverPfp(pfp);
      }
    });
    getAllData('Account', 'username', receiverUsername).then((data) => {
      if (data.length === 0) {
        console.log('No results')
      }
      else{
        let userEmail = data[0]['email']
        setReceiverEmail(userEmail)
      }
    });
  }, []);

  const customInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={styles.textInputStyles}
        containerStyle={{backgroundColor: colours.transparent, borderTopColor: colours.primary}}
      />
    );
  };
  
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons name='send-circle' size={40} color={colours.secondary} style={{marginBottom: 5, marginRight: 5}}/>
        </View>
      </Send>
    )
  }

  const renderBubble = (props) => {
    return (
      <Bubble {...props}
      wrapperStyle={{
        right: {
          marginRight: 5,
          backgroundColor: '#A32CC4',
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowOffset: {height: 0, width: 0},
          shadowRadius: 5
        },
        left: {
          backgroundColor: colours.secondaryBlack,
          shadowColor: 'black',
          shadowOpacity: 0.4,
          shadowOffset: {height: 0, width: 0},
          shadowRadius: 5
        }
      }}
      textStyle={{
        right: {
          color: 'white'
        },
        left: {
          color: 'white'
        }
      }}
      />
    )
  }

  useEffect(() => {
    const unsubscribe = fbDB.collection('chats').
    orderBy('createdAt', 'desc').
    onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
      // snapshot.docs.map(function c(doc) {
      //   if (((doc.data().user['name']) == receiverUsername) || ((doc.data().user['name']) == username)) {
      //     return ({
      //       _id: doc.data()._id,
      //       createdAt: doc.data().createdAt.toDate(),
      //       text: doc.data().text,
      //       user: doc.data().user
      //     })
      //   }
      //   else {
      //     console.log(doc.data().user)
      //   }
      // })
    ))
    return unsubscribe; // Returns a listener to the database which will trigger the useEffect function whenever there is a change to the database
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.
    append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    fbDB.collection('chats').add({_id, createdAt, text, user})
  }, []) // This function will trigger whenever a user sends a message and will add that message to the database along with some other info about the message

  const onBackPressed = () => {
    navigation.navigate('UserDisp', {usernamePassed: receiverUsername, userUsernamePassed: username})
  }

  return (
    <View style={{flex: 1, backgroundColor: colours.primary}}>
      <View style={{height: 100, backgroundColor: colours.secondaryBlack, shadowColor: 'black', shadowOffset: {height: 5, width: 0}, shadowOpacity: 0.5, shadowRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name='chevron-back' size={30} color='white' style={{marginTop: 30, marginRight: 110, marginLeft: -130}} onPress={onBackPressed}/>
        <Text style={{color: 'white', marginTop: 35, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline'}}>{receiverUsername}</Text>
      </View>
      <TouchableOpacity style={{shadowColor: 'black', shadowOpacity: 0.5, shadowOffset: {height: 0, width: 0}, shadowRadius: 3}}>
          <Image source={{uri: receiverPfp}} style={{width: 50, height: 50, marginTop: -60, marginLeft: 325, borderRadius: 25, position: 'absolute'}}/>
        </TouchableOpacity>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: email, // MessageID from DB
          name: username, // Users from DB
          avatar: Pfp // Pfp from DB
        }}
        multiline={true}
        isTyping={true}
        messagesContainerStyle={styles.messageContainerStyles}
        renderInputToolbar={props => customInputToolbar(props)}
        textInputStyle={{color: 'white', marginTop: 10}}
        renderSend={renderSend}
        renderBubble={renderBubble}
        bottomOffset={getBottomSpace() - 10}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainerStyles: { // Styles for the background of the text input
    backgroundColor: colours.primary
  },
  textInputStyles: { // Styles for the text input box at the bottom of the screen
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 15,
    backgroundColor: colours.secondaryBlack,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {height: 0, width: 0},
  }
})