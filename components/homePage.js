import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native';

const Item = ({ title, selectRecipe }) => (
  <Pressable
    onPress={() => selectRecipe(title)}
    style={({ pressed }) => [{backgroundColor: pressed ? '#777B65' : '#8C9178'}, styles.pressable]}
  >
    <View style={styles.itemsWrapper}>
      <Text style={styles.item} numberOfLines={1}>{title}</Text>
    </View>
  </Pressable>
)

export default function HomePage({ recipes, selectRecipe }) {
  return (
    <View style={styles.view}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <Item title={item.title} selectRecipe={selectRecipe} />}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center'
  },
  title: {
    alignSelf: 'center',
    color: '#333333',
    fontSize: 30,
    fontWeight: '600'
  },
  itemsWrapper: {
    padding: 18
  },
  item: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  },
  pressable: {
    borderRadius: 5,
    margin: 12
  }
})