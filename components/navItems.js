import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from 'react-native';
import { COLORS } from '../config/colors';
import ShoppingHandler from './shoppingHandler';

function Item({ title, recipeTitle, selectRecipe, handleRemoveRecipe }) {
  const [deleteTitle, setDeleteTitle] = useState('')

  const changeHighLight =(title) => {
    setDeleteTitle(title)
  }

  const alert = (title) => {
    Alert.alert(
      'Delete Recipe',
      `Are you sure you want to delete the recipe ${title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => setDeleteTitle(''),
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => handleRemoveRecipe(title)
        }
      ]
    )
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.pressable, {backgroundColor: pressed ? COLORS.champagne : COLORS.seashell}, styles.touch, title === recipeTitle ? styles.selectedItem : {}, title === deleteTitle ? {backgroundColor: COLORS.redwood}: {}]}
      onPress={() => selectRecipe(title)}
      onLongPress={() => {
        changeHighLight(title)
        alert(title)
      }}
    >
      <View style={styles.itemsWrapper}>
        <Text style={[styles.text, title === deleteTitle ? {color: COLORS.white} : {}]} numberOfLines={1}>{title}</Text>
      </View>
    </Pressable>
  )
}

export default function SideNav({ navOpen, recipes, recipeTitle, selectRecipe, handleRemoveRecipe, handleAddRecipe }) {

  return(
    <>
      {navOpen ?
      <View style={styles.container}>
        <FlatList 
          data={recipes}
          renderItem={({ item }) => <Item title={item.title} recipeTitle={recipeTitle} selectRecipe={selectRecipe} handleRemoveRecipe={handleRemoveRecipe} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          ListFooterComponent={<ShoppingHandler recipes={recipes} handleAddRecipe={handleAddRecipe}/>}
        />
      </View>
      :
      <></>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    zIndex: 3
  },
  pressable: {
    margin: 5
  },
  list: {
    width: '100%',
    zIndex: 4
  },
  touch: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5
  },
  itemsWrapper: {
    width: '100%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 5
  },
  text: {
    marginLeft: 20,
    height: 'auto',
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.salmon
  },
  selectedItem: {
    backgroundColor: COLORS.champagne
  }
})