import React, { useEffect, useRef } from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../config/colors';

export default function RecipeItem({
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
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={() => handleCheckedItem(index, !checked, 'ingredients')}
      >
        {checked && <Ionicons name='checkmark' size={24} color={COLORS.white} />}
      </Pressable>
      <TextInput
        ref={inputEl}
        value={value}
        placeholder='new item...'
        onChangeText={text => handleItemChange(index, text, 'ingredients')}
        onFocus={() => {
          if (index !== currentIndex) {
            setCurrentIndex(index)
          }
        }}
        editable
        blurOnSubmit={false}
        onKeyPress={data => {
          if (data.nativeEvent.key === 'Backspace' && value === '' && index !== 0) {
            handleRemoveItemLine(index, 'ingredients')
            setCurrentIndex(index - 1)
          }
        }}
        onSubmitEditing={() => {
          setCurrentIndex(index + 1)
          handleAddNewLine(index, '', 'ingredients')
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
  checkboxBase: {
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.darkYellow,
    overflow: 'visible'
  },
  checkboxChecked: {
    backgroundColor: COLORS.darkYellow,
  },
  textInput: {
    marginLeft: 15,
    fontSize: 18,
    width: '100%'
  }
})