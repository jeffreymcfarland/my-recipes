import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../config/colors';

const Item = ({ title, selectRecipe }) => (
  <Pressable
    onPress={() => selectRecipe(title)}
    style={({ pressed }) => [{backgroundColor: pressed ? COLORS.unitedNations : COLORS.littleBoy}, styles.pressable]}
  >
    <View style={styles.itemsWrapper}>
      <Text style={styles.item} numberOfLines={1}>{title}</Text>
    </View>
  </Pressable>
)

export default function HomePage({ recipes, selectRecipe, navOpen, closeNav }) {
  return (
    <TouchableWithoutFeedback onPress={navOpen ? closeNav : console.log('nav already closed')}>
      <View style={styles.view}>
        <FlatList
          data={recipes}
          renderItem={({ item }) => <Item title={item.title} selectRecipe={selectRecipe} />}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>
    </TouchableWithoutFeedback>
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
    margin: 12
  }
})