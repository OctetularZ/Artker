import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatScreen() {
  const navigation = useNavigation();
  const db = SQLite.openDatabase('Artker')
  const [messages, setMessages] = useState([]);

  const addMessageToDB = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM Profiles WHERE Username = '${usernameDB}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {}
        else {
          let chatInfo = results[0]
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  }

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.
    append(previousMessages, messages))
    const { _id, createdAt,  message, user } = messages[0]
    // Get message from DB
  }, [])

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1, // MessageID from DB
        name: username, // Users from DB
        avatar: userAvatar // Pfp from DB
      }}
    />
  )
}

const styles = StyleSheet.create({})