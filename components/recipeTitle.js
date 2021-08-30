import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function RecipeTitle({ title, window }) {
  return (
    <View style={[titleStyles.container, {height: window.height / 6}]}>
        <Text style={titleStyles.title}>{title}</Text>
    </View>
  )
}

const titleStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20
  },
  title: {
    color: '#333333',
    fontSize: 30,
    fontWeight: '500'
  }
});
