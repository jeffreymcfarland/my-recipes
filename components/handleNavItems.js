import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Alert, Modal, Text, TouchableHighlight, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function handleNavItems({ recipeTitle, handleRemoveRecipe, handleAddRecipe }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('')

  const alert = (title) => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete the recipe ${title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => handleRemoveRecipe()
        }
      ]
    )
  }

  return (
    <View style={styles.view}>
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
                style={{...styles.modalBtn, backgroundColor: '#F5F5F5'}}
                underlayColor={'#EBEBEB'}
                onPress={() => {
                  setValue('')
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{...styles.textStyle, color: '#333333'}}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.modalBtn}
                underlayColor={'#777B65'}
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
      <Pressable
        onPress={() => alert(recipeTitle)}
        style={styles.pressable}
      >
        <MaterialCommunityIcons name={'delete'} size={30} style={recipeTitle === 'My Recipes' ? {color: '#ffffff'} : {color: '#333333'}} />
      </Pressable>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.pressable}
      >
        <Ionicons name={'ios-add'} size={40} color='#333333' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    marginTop: 30
  },
  pressable: {

  },
  btnView: {
    flexDirection: 'row'
  },
  textinput: {
    alignSelf: 'center',
    borderColor: '#EBEBEB',
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
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#333333',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtn: {
    backgroundColor: '#8C9178',
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    margin: 2.5
  },
  textStyle: {
    color: '#ffffff',
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