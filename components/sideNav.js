import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import NavItems from './navItems';
import HandleNavItems from './handleNavItems';
import RecipeModal from './recipeModal';
import { COLORS } from '../config/colors';
import { Ionicons } from '@expo/vector-icons';

export default function SideNav({
  toggleNav,
  navOpen,
  navContainerSize,
  iconPosition,
  window,
  recipes,
  recipeTitle,
  selectRecipe,
  handleRemoveRecipe,
  handleAddRecipe,
  addRecipeModalVisible,
  setAddRecipeModalVisible
}) {
  return (
    <>
      <TouchableWithoutFeedback style={styles.navTouchable} onPress={toggleNav} hitSlop={navOpen ? {right: 200, left: -200} : {}}>
        <View 
          style={[styles.navContainer, {
            width: window.width / navContainerSize
          }]}
        >
          <RecipeModal handleAddRecipe={handleAddRecipe} addRecipeModalVisible={addRecipeModalVisible} setAddRecipeModalVisible={setAddRecipeModalVisible} />
          {navOpen ? 
            <HandleNavItems
              selectRecipe={selectRecipe}
              setAddRecipeModalVisible={setAddRecipeModalVisible}
              recipes={recipes}
              handleAddRecipe={handleAddRecipe}
              handleRemoveRecipe={handleRemoveRecipe}
            />
            :
            <></>
          }
          <NavItems
            navOpen={navOpen}
            recipes={recipes}
            recipeTitle={recipeTitle}
            selectRecipe={selectRecipe}
            handleRemoveRecipe={handleRemoveRecipe}
            window={window}
            navContainerSize={navContainerSize}
          />
          <View
            style={[styles.iconContainer, {
              width: window.width / iconPosition
            }]}
          >
            <Pressable style={styles.iconView} onPress={toggleNav}>
              <Ionicons name={navOpen ? 'chevron-back-circle' : 'chevron-forward-circle'} style={styles.chevron} size={40} color={COLORS.medOrange} />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: COLORS.lightOrange,
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    borderRightWidth: 3,
    borderColor: COLORS.medOrange,
    shadowColor: COLORS.darkGray,
    shadowOffset: {
    width: 4,
    height: 0
    },
    shadowOpacity: 0.2
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 6,
    top: '50%',
    alignItems: 'center'
  },
  iconView: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
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
  navTouchable: {
    backgroundColor: 'transparent',
    width: window.width,
    zIndex: 20
  }
})
