import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function RecipeTitle({ title }) {
  return (
    <View style={titleStyles.container}>
        <Text style={titleStyles.title}>{title}</Text>
    </View>
  )
}

const titleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    top: 70
  },
  title: {
    color: '#282828',
    fontSize: 30,
    fontWeight: '500'
  }
});
