import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../config/colors';
import GroceriesModal from './groceriesModal';

export default function ShoppingHandler({ recipes, handleAddRecipe }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([])

  const handleGroceryList = () => {
    setModalVisible(true)
    makeSelectedList()
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
        handleAddRecipe={handleAddRecipe}
        makeShoppingList={makeShoppingList}
      />
      <Pressable style={({ pressed }) => [styles.pressable, {backgroundColor: pressed ? COLORS.alice : COLORS.white}]} onPress={handleGroceryList}>
        <Text style={styles.btnText}>Make Shopping List</Text>
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