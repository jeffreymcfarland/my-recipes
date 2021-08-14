import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SideNav from './components/sideNav';
import RecipeTitle from './components/recipeTitle';

export default function App() {
  
  useEffect(() => {
    console.log('hello')
  });

  return (
    <View style={mainContainer.container}>
      <SideNav />
      <RecipeTitle />
      <StatusBar style="auto" />
    </View>
  );
}

const mainContainer = StyleSheet.create({
  container: {
    flex: 1
  }
})
