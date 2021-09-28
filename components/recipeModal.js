import React, { useState } from 'react';
import { StyleSheet, View, Alert, Modal, Text, TouchableHighlight, TextInput, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../config/colors';
import ErrorMessage from './errorMessage';

export default function RecipeModal({ handleAddRecipe, addRecipeModalVisible, setAddRecipeModalVisible }) {
  const [value, setValue] = useState('')
  const [emptyInput, setEmptyInput] = useState(false)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addRecipeModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setAddRecipeModalVisible(!addRecipeModalVisible)
      }}
    >
      <TouchableWithoutFeedback
        onPress={(() => setAddRecipeModalVisible(!addRecipeModalVisible))}
        underlayColor='transparent'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Recipe Title</Text>
            <TextInput
              value={value}
              onChangeText={text => {
                setEmptyInput(false)
                setValue(text)
              }}
              editable
              placeholder={emptyInput ? '' : 'Tikka Masala'}
              style={[styles.textinput, emptyInput ? styles.textInputEmpty : {}]}
            />
            <ErrorMessage isShown={emptyInput} />
            <View style={styles.btnView} >
              <TouchableHighlight
                style={{...styles.modalBtn, backgroundColor: COLORS.lightGray}}
                underlayColor={COLORS.medGray}
                onPress={() => {
                  setValue('')
                  setAddRecipeModalVisible(!addRecipeModalVisible);
                  setEmptyInput(false)
                }}>
                <Text style={{...styles.textStyle, color: COLORS.darkGray}}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.modalBtn}
                underlayColor={COLORS.darkYellow}
                onPress={() => {
                  if (value !== '') {
                    setEmptyInput(false)
                    handleAddRecipe(value, [{
                      item: '',
                      checked: false
                    }],
                    [{
                      body: '',
                      checked: false
                    }])
                    setAddRecipeModalVisible(!addRecipeModalVisible);
                  } else {
                    setEmptyInput(true)
                  }
                  setValue('')
                }}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  btnView: {
    flexDirection: 'row'
  },
  textinput: {
    alignSelf: 'center',
    borderColor: COLORS.darkGray,
    borderWidth: 2,
    borderRadius: 4,
    height: 40,
    width: 200,
    marginBottom: 29,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: '600'
  },
  textInputEmpty: {
    borderColor: COLORS.darkRed,
    fontWeight: '700',
    marginBottom: 3.5
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
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBtn: {
    backgroundColor: COLORS.medDarkYellow,
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
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  }
})