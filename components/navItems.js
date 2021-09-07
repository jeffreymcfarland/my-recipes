import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, Alert } from 'react-native';
import { COLORS } from '../config/colors';

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
      style={({ pressed }) => [{backgroundColor: pressed ? COLORS.platinum : COLORS.white}, styles.touch, title === recipeTitle ? styles.selectedItem : {}, title === deleteTitle ? {backgroundColor: '#B35F56'}: {}]}
      onPress={() => selectRecipe(title)}
      onLongPress={() => {
        changeHighLight(title)
        alert(title)
      }}
    >
      <View style={styles.itemsWrapper}>
        <Text style={[styles.item, title === deleteTitle ? {color: COLORS.white} : {}]} numberOfLines={1}>{title}</Text>
      </View>
    </Pressable>
  )
}

export default function SideNav({ navOpen, recipes, recipeTitle, selectRecipe, handleRemoveRecipe }) {

  return(
    <>
      {navOpen ?
      <View style={styles.container}>
        <FlatList 
          data={recipes}
          renderItem={({ item }) => <Item title={item.title} recipeTitle={recipeTitle} selectRecipe={selectRecipe} handleRemoveRecipe={handleRemoveRecipe} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
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
    zIndex: 3
  },
  list: {
    width: '100%',
    zIndex: 4
  },
  touch: {
    width: '100%',
  },
  itemsWrapper: {
    width: '100%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 5
  },
  item: {
    marginLeft: 20,
    height: 'auto',
    fontSize: 18,
    fontWeight: '600'
  },
  selectedItem: {
    backgroundColor: COLORS.platinum
  }
})