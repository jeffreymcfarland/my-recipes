import React, { useRef, useEffect } from 'react';
import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { COLORS } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

export default function DirectionSteps({
  value,
  index,
  checked,
  handleCheckedItem,
  handleItemChange,
  handleAddNewLine,
  handleRemoveItemLine,
  currentIndex,
  setCurrentIndex
}) {
  const inputEl = useRef()

  useEffect(() => {
    if (index === currentIndex) {
      inputEl.current.focus()
    }
  })

  return (
    <View style={styles.view}>
      {/* <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => handleCheckedItem(index, !checked, 'directions')}
      >
        {checked && <Ionicons name='checkmark' size={24} color={COLORS.artichoke} />}
      </Pressable> */}
      <Text style={styles.stepText}>Step {index + 1}:</Text>
      <TextInput
        ref={inputEl}
        value={value}
        onChangeText={text => handleItemChange(index, text, 'directions')}
        multiline
        scrollEnabled={false}
        onFocus={() => {
          if (index !== currentIndex) {
            setCurrentIndex(index)
          }
        }}
        editable
        blurOnSubmit={false}
        onKeyPress={data => {
          if (data.nativeEvent.key === 'Backspace' && value === '' && index !== 0) {
            handleRemoveItemLine(index, 'directions')
            setCurrentIndex(index - 1)
          }
        }}
        onSubmitEditing={() => {
          setCurrentIndex(index + 1)
          handleAddNewLine(index, '', 'directions')
        }}
        style={styles.textInput}
        onBlur={() => setCurrentIndex()}
        enablesReturnKeyAutomatically={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginBottom: 10
  },
  stepText: {
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.medDarkRed
  },
  checkboxBase: {
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.medGreen,
    backgroundColor: 'transparent',
    overflow: 'visible'
  },
  checkboxChecked: {
    backgroundColor: COLORS.white,
  },
  textInput: {
    marginLeft: 15,
    fontSize: 18,
    width: '75%'
  }
})