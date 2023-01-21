import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'

const InstrumentArray = [
  {id: '1', value: 'United '},
  {id: '2', value: 'Guitar'},
  {id: '3', value: 'Drums'},
  {id: '4', value: 'Piano'},
  {id: '5', value: 'Piano'},
  {id: '6', value: 'Piano'},
  {id: '7', value: 'Piano'},
]

export default function laterRequired() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Pressable
            style={styles.closeModalButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons name='close-outline' size={35} color='white'/>
          </Pressable>
          <FlatList>

          </FlatList>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colours.primary,
    flex: 1,
    paddingTop: 50,
    paddingLeft: 30
  },
  closeModalButton: {
    paddingBottom: 25
  }
})