import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../config/colors';
import ShoppingHandler from './shoppingHandler';

export default function handleNavItems({
  selectRecipe,
  setAddRecipeModalVisible,
  recipes,
  handleAddRecipe,
  handleRemoveRecipe,
  setRecipeTitle,
  setRecipeBody,
  toggleNav,
 }) {
  return (
    <>
      <View style={styles.view}>
        <Pressable
          onPress={() => selectRecipe('My Recipes')}
          style={({ pressed }) => [styles.pressableHome, {backgroundColor: pressed ? COLORS.mediumYellow : COLORS.lightOrange}]}
        >
          <Text style={styles.home}>Home</Text>
        </Pressable>
        <Pressable
          onPress={() => setAddRecipeModalVisible(true)}
          style={styles.recipePressable}
        >
          <MaterialIcons name="post-add" size={34} color={COLORS.medDarkBlue} />
        </Pressable>
        <ShoppingHandler
          recipes={recipes}
          handleAddRecipe={handleAddRecipe}
          handleRemoveRecipe={handleRemoveRecipe}
          setRecipeTitle={setRecipeTitle}
          setRecipeBody={setRecipeBody}
          toggleNav={toggleNav}
          backgroundColor={COLORS.lightOrange}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    marginTop: 30,
    paddingRight: 10,
    paddingLeft: 10
  },
  pressableHome: {
    padding: 10,
    width: '50%',
    marginRight: 20,
    borderRadius: 5
  },
  home: {
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    color: COLORS.darkYellow
  },
  recipePressable: {
    marginRight: 10
  }
})