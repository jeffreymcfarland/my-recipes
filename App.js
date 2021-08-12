import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const window = Dimensions.get("window")

export default function App() {

  useEffect(() => {
    console.log('hello')
  });

  const RecipeTitle = () => {
    return (
      <View style={title.container}>
        <Text style={title.title}>Tikka Masala</Text>
      </View>
    )
  }

  return (
    <View style={mainContainer.container}>
      <View style={sideNav.container}>
        <View style={openIcon.container}>
          <View style={openIcon.icon}></View>
        </View>
      </View>
      <RecipeTitle />
      <StatusBar style="auto" />
    </View>
  );
}

const mainContainer = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const sideNav = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    height: '100%',
    width: window.width / 10,
    zIndex: 1,
    position: 'absolute',
    borderRightWidth: 2,
    borderColor: '#282828'
  }
})

const openIcon = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    // left: '100%',
    width: window.width / 5,
    alignItems: 'center'
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#282828',
    backgroundColor: '#ffffff',
    zIndex: 2
  }
})

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
