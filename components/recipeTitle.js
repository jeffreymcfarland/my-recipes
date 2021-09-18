import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../config/colors';

export default function RecipeTitle({ title, window }) {
  return (
    <View style={[styles.container, {height: window.height / 8}]}>
        <Text style={[styles.title, {color: title === 'My Recipes' ? COLORS.earthYellow : COLORS.artichoke}]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  }
});
