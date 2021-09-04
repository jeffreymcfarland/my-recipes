import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import NavItems from './navItems';
import HandleNavItems from './handleNavItems';

export default function SideNav({ toggleNav, navOpen, iconRotate, navContainerSize, iconPosition, window, recipes, recipeTitle, selectRecipe, handleRemoveRecipe, handleAddRecipe }) {

  return (
    <>
      <TouchableWithoutFeedback style={openIcon.button} onPress={toggleNav}>
        <View 
          style={[sideNav.container, {
            width: window.width / navContainerSize
          }]}
        >
          {navOpen ? 
            <HandleNavItems
              recipeTitle={recipeTitle}
              handleRemoveRecipe={handleRemoveRecipe} 
              handleAddRecipe={handleAddRecipe}
              selectRecipe={selectRecipe}
            /> : <></>}
          <NavItems navOpen={navOpen} recipes={recipes} recipeTitle={recipeTitle} selectRecipe={selectRecipe} handleRemoveRecipe={handleRemoveRecipe} />
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
    borderColor: '#333333',
    shadowColor: '#333333',
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
    zIndex: 6,
    top: '50%',
    alignItems: 'center'
  },
  icon: {
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#333333',
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
