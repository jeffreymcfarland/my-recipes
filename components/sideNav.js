import React from 'react';
import { 
    StyleSheet, 
    View, 
    Image, 
    TouchableWithoutFeedback } from 'react-native';
import NavItems from './navItems';

export default function SideNav({ toggleNav, navOpen, iconRotate, navContainerSize, iconPosition, window, recipes, selectRecipe }) {

  return (
    <>
      <TouchableWithoutFeedback style={openIcon.button} onPress={toggleNav}>
        <View 
          style={[sideNav.container, {
            width: window.width / navContainerSize
          }]}
        >
          <NavItems navOpen={navOpen} recipes={recipes} selectRecipe={selectRecipe} />
          <View
            style={[openIcon.container, {
              width: window.width / iconPosition
            }]}
          >
            <View style={openIcon.icon}>
              <Image
                source={require('../assets/chevron.png')}
                style={[openIcon.chevron, {
                  transform: [
                    {rotate: iconRotate}
                  ]
                }]}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const sideNav = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-start',
    height: '100%',
    zIndex: 2,
    position: 'absolute',
    borderRightWidth: 2,
    borderColor: '#282828',
    shadowColor: '#282828',
    shadowOffset: {
    width: 4,
    height: 0
    },
    shadowOpacity: 0.2
  }
})

const openIcon = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    alignItems: 'center'
  },
  icon: {
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#282828',
    shadowOffset: {
      width: 4,
      height: 0
    },
    shadowOpacity: 0.2
  },
  chevron: {
    width: 35,
    height: 35
  },
  button: {
    backgroundColor: 'transparent'
  }
})
