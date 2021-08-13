import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

const window = Dimensions.get('window')

export default function App() {
  const [iconRotate, setIconRotate] = useState('0deg')

  useEffect(() => {
    console.log('hello')
  });

  const rotateIcon = () => {
    if (iconRotate === '0deg') {
      setIconRotate('180deg')
    } else {
      setIconRotate('0deg')
    }
  }

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
          <TouchableWithoutFeedback style={openIcon.button} onPress={rotateIcon}>
            <View style={openIcon.icon}>
              <Image
                source={require('./assets/chevron.png')}
                style={[openIcon.chevron, {
                  transform: [
                    {rotate: iconRotate}
                  ]
                }]}
              />
            </View>
          </TouchableWithoutFeedback>
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
    width: window.width / 5,
    alignItems: 'center'
  },
  icon: {
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chevron: {
    width: 35,
    height: 35
  },
  button: {
    backgroundColor: 'transparent'
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
