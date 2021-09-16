import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../config/colors';

export default function RecipeItem({
  value,
  closeNav,
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
        onPress={() => handleCheckedItem(index, !checked)}
      >
        {checked && <Ionicons name='checkmark' size={24} color={COLORS.artichoke} style={styles.icon} />}
      </Pressable>
      <TextInput
        ref={inputEl}
        value={value}
        onChangeText={text => handleItemChange(index, text)}
        onFocus={() => {
          if (index !== currentIndex) {
            setCurrentIndex(index)
          }
          closeNav()
        }}
        autoFocus={currentIndex === index ? true : false}
        editable
        blurOnSubmit={false}
        onKeyPress={data => {
          if (data.nativeEvent.key === 'Backspace' && value === '' && index !== 0) {
            handleRemoveItemLine(index)
            setCurrentIndex(index - 1)
          }
        }}
        onSubmitEditing={() => {
          setCurrentIndex(index + 1)
          handleAddNewLine(index + 1, index, '')
        }}
        style={styles.textInput}
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
    borderColor: COLORS.artichoke,
    backgroundColor: 'transparent',
    overflow: 'visible'
  },
  checkboxChecked: {
    backgroundColor: COLORS.white,
  },
  icon: {
    
  },
  textInput: {
    marginLeft: 10,
    fontSize: 18,
    width: '100%'
  }
})