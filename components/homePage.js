import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../config/colors';
import ShoppingHandler from './shoppingHandler';

const Item = ({ title, selectRecipe }) => (
  <Pressable
    onPress={() => selectRecipe(title)}
    style={({ pressed }) => [{backgroundColor: pressed ? COLORS.earthYellow : COLORS.burlywood}, styles.pressable]}
  >
    <View style={styles.itemsWrapper}>
      <Text style={styles.item} numberOfLines={1}>{title}</Text>
    </View>
  </Pressable>
)

export default function HomePage({ recipes, selectRecipe, toggleNav, handleAddRecipe }) { 
  return (
    <>
      <ShoppingHandler recipes={recipes} handleAddRecipe={handleAddRecipe}/>
      <TouchableWithoutFeedback onPress={toggleNav}>
        <View style={styles.view}>
          <FlatList
            data={recipes}
            renderItem={({ item }) => <Item title={item.title} selectRecipe={selectRecipe} />}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    padding: 20
  },
  itemsWrapper: {
    padding: 18
  },
  item: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600'
  },
  pressable: {
    borderRadius: 5,
    margin: 8
  }
})