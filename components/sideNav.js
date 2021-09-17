import React from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import NavItems from './navItems';
import HandleNavItems from './handleNavItems';
import { COLORS } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

export default function SideNav({ toggleNav, navOpen, navContainerSize, iconPosition, window, recipes, recipeTitle, selectRecipe, handleRemoveRecipe, handleAddRecipe }) {

  return (
    <>
      <TouchableWithoutFeedback style={openIcon.button} onPress={toggleNav} hitSlop={navOpen ? {right: 200} : {}}>
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
            />
            :
            <></>
          }
          <NavItems navOpen={navOpen} recipes={recipes} recipeTitle={recipeTitle} selectRecipe={selectRecipe} handleRemoveRecipe={handleRemoveRecipe} />
          <View
            style={[openIcon.container, {
              width: window.width / iconPosition
            }]}
          >
            <View style={openIcon.icon}>
              <Ionicons name={navOpen ? 'chevron-back-circle' : 'chevron-forward-circle'} style={openIcon.chevron} size={40} color={COLORS.salmon} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const sideNav = StyleSheet.create({
  container: {
    backgroundColor: COLORS.seashell,
    alignItems: 'flex-start',
    height: '100%',
    zIndex: 2,
    position: 'absolute',
    borderRightWidth: 3,
    borderColor: COLORS.salmon,
    shadowColor: COLORS.jet,
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
    backgroundColor: COLORS.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 4,
      height: 0
    },
    shadowOpacity: 0.2
  },
  chevron: {
  borderRadius: 20,
  margin: -6
  },
  button: {
    backgroundColor: 'transparent',
    width: window.width,
    zIndex: 20
  }
})
