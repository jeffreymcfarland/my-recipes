import React, { useState } from 'react';
import { StyleSheet, View, Alert, Modal, Text, TouchableHighlight, TextInput } from 'react-native';
import { COLORS } from '../config/colors';

export default function CustomModal({ handleAddRecipe, modalVisible, setModalVisible }) {
  const [value, setValue] = useState('')

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter Recipe Title</Text>
          <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            editable
            placeholder='Tikka Masala'
            style={styles.textinput}
          />
          <View style={styles.btnView} >
            <TouchableHighlight
              style={{...styles.modalBtn, backgroundColor: COLORS.cultured}}
              underlayColor={COLORS.platinum}
              onPress={() => {
                setValue('')
                setModalVisible(!modalVisible);
              }}>
              <Text style={{...styles.textStyle, color: COLORS.jet}}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalBtn}
              underlayColor={COLORS.xanadu}
              onPress={() => {
                handleAddRecipe(value)
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  btnView: {
    flexDirection: 'row'
  },
  textinput: {
    alignSelf: 'center',
    borderColor: COLORS.jet,
    borderWidth: 2,
    borderRadius: 4,
    height: 40,
    width: 140,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: '600'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtn: {
    backgroundColor: COLORS.artichoke,
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    margin: 2.5
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  },
})