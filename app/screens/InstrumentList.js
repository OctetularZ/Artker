import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useState } from 'react'
import colours from '../config/colours'

export default function InstrumentList() {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View>
            <Text>EEE</Text>
          </View>

        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    color: colours.primary,
    width: '100%',
    height: '100%'
  }
})