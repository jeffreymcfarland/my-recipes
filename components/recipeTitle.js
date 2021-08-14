import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function RecipeTitle() {
    return (
        <View style={title.container}>
            <Text style={title.title}>Tikka Masala</Text>
        </View>
    )
}

const title = StyleSheet.create({
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
