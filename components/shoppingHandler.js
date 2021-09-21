import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../config/colors';
import GroceriesModal from './groceriesModal';
import { Fontisto } from '@expo/vector-icons';

export default function ShoppingHandler({
  recipes,
  handleAddRecipe,
  handleRemoveRecipe,
  backgroundColor
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([])

  const handleGroceryList = () => {
    setModalVisible(true)
    makeSelectedList()
    recipes.map(recipe => {
      if (recipe.title === 'Shopping List') {
        handleRemoveRecipe('Shopping List')
      }
    })
  }

  const makeSelectedList = () => {
    let recipeArray = [...selectedRecipes]
    recipes.map(recipes => {
      recipeArray.push({
        title: recipes.title,
        selected: false
      })
    })
    setSelectedRecipes(recipeArray)
  }

  const makeShoppingList = (selected) => {
    let listArray = []
    selected.map(recipe => {
      if (recipe.selected) {
        listArray.push(recipe.title)
      }
    })

    let listBody = []
    recipes.map(recipe => {
      listArray.map(title => {
        if (recipe.title === title) {
          recipe.body.map(item => {
            listBody.push(item)
          })
        }
      })
    })
    handleAddRecipe('Shopping List', listBody)
  }

  return (
    <>
      <GroceriesModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        recipes={recipes}
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
        makeShoppingList={makeShoppingList}
      />
      <Pressable
        style={({ pressed }) => [
          styles.pressable,
          {backgroundColor: pressed ? COLORS.alice : COLORS.white}
        ]}
        onPress={handleGroceryList}
      >
        <Fontisto style={[{backgroundColor: backgroundColor}]} name="shopping-basket-add" size={24} color={COLORS.cerulean} />
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 5,
    alignSelf: 'center'
  }
})