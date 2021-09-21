import React, { useState } from 'react';
import { Switch, View, Text, StyleSheet} from 'react-native';
import { COLORS } from '../config/colors';

export default function RecipeSelectList({ title, selectedRecipes, setSelectedRecipes }) {
  const [isSwitched, setIsSwitched] = useState(false)

  const toggleSwitch = () => {
    setIsSwitched(previousState => !previousState)
    if (!isSwitched) {
      handleSelectedRecipes(true)
    } else {
      handleSelectedRecipes(false)
    }
  }

  const handleSelectedRecipes = (status) => {
    let recipes = [...selectedRecipes]
    const recipeIndex = recipes.findIndex(obj => obj.title === title)
    let recipe = {...recipes[recipeIndex]}
    recipe.selected = status
    recipes[recipeIndex] = recipe
    setSelectedRecipes(recipes)
  }

  return(
    <View style={styles.view}>
      <Switch
        trackColor={{ true: COLORS.beau }}
        thumbColor={isSwitched ? COLORS.cerulean : COLORS.white}
        ios_backgroundColor={COLORS.white}
        onValueChange={toggleSwitch}
        value={isSwitched}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  text: {
    marginLeft: 10,
    fontSize: 18
  }
})