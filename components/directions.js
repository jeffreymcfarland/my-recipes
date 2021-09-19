import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { COLORS } from '../config/colors';

export default function Directions({ recipeDirections, handleSetRecipeDirections }) {

  return (
    <View style={styles.view}>
      <TextInput
        multiline
        onChangeText={text => handleSetRecipeDirections(text)}
        placeholder={'Directions...'}
        value={recipeDirections}
        style={styles.input}
        selectionColor={COLORS.xanadu}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  title: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    height: '100%',
    padding: 10,
    fontSize: 18
  }
})