import React, { useRef, useEffect, useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS } from '../config/colors';

export default function Directions({ recipeDirections, handleSetRecipeDirections }) {
  const inputEl = useRef()
  const [isFocused, setIsFocused] = useState(true)

  useEffect(() => {
    if (isFocused) {
      inputEl.current.focus()
    }
  })

  return (
    <View style={styles.view}>
      <TextInput
        ref={inputEl}
        scrollEnabled
        multiline
        editable={isFocused ? true : false}
        onChangeText={text => handleSetRecipeDirections(text)}
        placeholder={'Directions...'}
        value={recipeDirections}
        style={styles.input}
        selectionColor={COLORS.xanadu}
        onScroll={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    height: '100%',
    padding: 10,
    fontSize: 20
  }
})