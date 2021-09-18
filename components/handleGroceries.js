import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../config/colors';
import GroceriesModal from './groceriesModal';

export default function HandleGroceries({ recipes, handleAddRecipe }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([])

  const handleGroceryList = () => {
    setModalVisible(true)
    makeList()
  }

  const makeList = () => {
    let recipeArray = [...selectedRecipes]
    recipes.map(recipes => {
      recipeArray.push({
        title: recipes.title,
        selected: false
      })
    })
    setSelectedRecipes(recipeArray)
    console.log(recipeArray)
  }

  return (
    <>
      <GroceriesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        recipes={recipes}
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
        handleAddRecipe={handleAddRecipe}
      />
      <Pressable style={({ pressed }) => [styles.pressable, {backgroundColor: pressed ? COLORS.alice : COLORS.white}]} onPress={handleGroceryList}>
        <Text style={styles.btnText}>Make Grocery List</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: COLORS.alice,
    width: 'auto',
    padding: 12,
    borderRadius: 5,
    borderColor: COLORS.cerulean,
    borderWidth: 2,
    marginTop: 20,
    alignSelf: 'center',
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.3
  },
  btnText: {
    alignSelf: 'center',
    color: COLORS.cerulean,
    fontSize: 18,
    fontWeight: '600'
  }
})