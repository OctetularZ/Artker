import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import colours from '../config/colours'
import { ScrollView } from 'react-native-gesture-handler'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons'
import { GiftedChat } from 'react-native-gifted-chat'

export default function ChatScreen({ route }) {
  const navigation = useNavigation();
  const db = SQLite.openDatabase('Artker')
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
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Chats (id INTEGER PRIMARY KEY, createdAt TEXT, text TEXT, user TEXT)')
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM Profiles WHERE Username = '${username}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {}
        else {
          let userInfo = results[0]
          let pfp = userInfo['Pfp']
          let name = userInfo['Name']

          setName(name);
          setPfp(pfp);
        }
      },
      (txObj, error) => console.log(error)
      )
    });
    db.transaction(tx => {
      tx.executeSql(`SELECT Email FROM Account WHERE Username = '${username}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {
          console.log('No results')
        }
        else {
          let userObj = results[0]
          let userEmail = userObj['Email']
          setEmail(userEmail)
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM Profiles WHERE Username = '${receiverUsername}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {}
        else {
          let userInfo = results[0]
          let pfp = userInfo['Pfp']
          let name = userInfo['Name']

          setReceiverName(name);
          setReceiverPfp(pfp);
        }
      },
      (txObj, error) => console.log(error)
      )
    });
    db.transaction(tx => {
      tx.executeSql(`SELECT Email FROM Account WHERE Username = '${receiverUsername}'`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        if (results.length === 0) {
          console.log('No results')
        }
        else {
          let userObj = results[0]
          let userEmail = userObj['Email']
          setReceiverEmail(userEmail)
        }
      },
      (txObj, error) => console.log(error)
      )
    });
  }, []);

  const addMessageToDB = (id, createdAt, text, user) => {
    db.transaction(tx => {
      tx.executeSql(`INSERT INTO Chats (id, createdAt, text, user) VALUES ('${id}', '${createdAt}', '${text}', '${user}')`)
    });
  }

  const listenToDB = () => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM Chats WHERE Username IN ('${username}', '${receiverUsername}') ORDER BY createdAt DESC`,
      null,
      (txObj , resultSet) => {
        let results = resultSet.rows._array
        console.log(results)
        if (results.length === 0) {}
        else {
          let userInfo = results[0]
          let pfp = userInfo['Pfp']
          let name = userInfo['Name']

          setName(name);
          setPfp(pfp);
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
    const { _id, createdAt, text, user } = messages[0]
    user = JSON.stringify(user)
    addMessageToDB(_id, createdAt, text, user) // Adds msg to DB
    // make function to run whenever the user sends a message
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