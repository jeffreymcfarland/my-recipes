import React, { useState, useEffect } from 'react';
import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function recipeItem({ value, closeNav, id, checked, handleCheckedItem, navOpen, handleItemChange, newItemIndex, handleAddNewLine, handleRemoveItemLine }) {
  return (
    <View style={recipeItems.view}>
      <Pressable
        style={[recipeItems.checkboxBase, checked && recipeItems.checkboxChecked]}
        onPress={() => handleCheckedItem(id, !checked)}
      >
        {checked && <Ionicons name='checkmark' size={24} color='#282828' style={recipeItems.icon} />}
      </Pressable>
      <TextInput
        value={value}
        autoFocus={!navOpen ? true : false}
        onChangeText={text => handleItemChange(id, text)}
        onFocus={() => closeNav}
        editable
        blurOnSubmit={false}
        onKeyPress={data => {
          if (data.nativeEvent.key === 'Backspace' && value === '') {
            handleRemoveItemLine(id)
          }
        }}
        onSubmitEditing={() => {id === (newItemIndex - 1) ? handleAddNewLine(newItemIndex, '') : console.log('no new item')}}
        style={recipeItems.textInput}
      />
    </View>
  )
}

const recipeItems = StyleSheet.create({
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
    borderColor: '#282828',
    backgroundColor: 'transparent',
    overflow: 'visible'
  },
  checkboxChecked: {
    backgroundColor: '#EBEBEB',
  },
  icon: {
    
  },
  textInput: {
    marginLeft: 10,
    fontSize: 18,
    width: '100%'
  }
})