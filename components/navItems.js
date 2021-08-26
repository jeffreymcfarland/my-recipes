import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';

const Item = ({ title, recipeTitle, selectRecipe }) => (
  <TouchableHighlight
    style={[navItems.touch, title === recipeTitle ? navItems.selectedItem : {}]}
    onPress={() => selectRecipe(title)}
    underlayColor={'#EBEBEB'}
  >
    <View style={navItems.itemsWrapper}>
      <Text style={navItems.item} numberOfLines={1}>{title}</Text>
    </View>
  </TouchableHighlight>
)

export default function SideNav({ navOpen, recipes, recipeTitle, selectRecipe }) {

  return(
    <>
      {navOpen ?
      <View style={navItems.container}>
        <FlatList 
          data={recipes}
          renderItem={({ item }) => <Item title={item.title} recipeTitle={recipeTitle} selectRecipe={selectRecipe} />}
          keyExtractor={item => item.id.toString()}
          style={navItems.list}
        />
      </View>
      :
      <></>
      }
    </>
  )
}

const navItems = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4
  },
  list: {
    width: '100%',
    paddingTop: 60,
    zIndex: 5
  },
  touch: {
    width: '100%',
  },
  itemsWrapper: {
    width: '100%',
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 6
  },
  item: {
    marginLeft: 20,
    height: 'auto',
    fontSize: 18,
    fontWeight: '600'
  },
  selectedItem: {
    backgroundColor: '#EBEBEB'
  }
})