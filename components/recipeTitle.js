import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../config/colors';

export default function RecipeTitle({ title }) {
  return (
    <View style={styles.container}>
        <Text style={[styles.title, {color: title === 'My Recipes' ? COLORS.darkYellow : COLORS.medGreen}]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    marginTop: 40
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center'
  }
});
