import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat'
import { db as fbDB } from '../../firebase'
import { getAllData, delDocs, getData } from '../database/dbScripts'

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
  console.log(username)
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

  useLayoutEffect(() => {
    const subscribe = fbDB.collection('chats').
    orderBy('CreatedAt', 'desc').
    onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    ))
    return subscribe;
  }, []) // Need to style then done - remember to test

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.
    append(previousMessages, messages))
    const { _id, createdAt, text, user } = messages[0]
    console.log(_id, createdAt, text, user)
    fbDB.collection('chats').add({_id, createdAt, text, user})
  }, [])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: email, // MessageID from DB
        name: username, // Users from DB
        avatar: Pfp // Pfp from DB
      }}
    />
  )
}

const styles = StyleSheet.create({})