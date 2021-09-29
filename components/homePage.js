import React from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../config/colors';
import ShoppingHandler from './shoppingHandler';
import AddRecipeBtn from './addRecipeBtn';

const Item = ({ title, selectRecipe }) => (
  <Pressable
    onPress={() => selectRecipe(title)}
    style={({ pressed }) => [{backgroundColor: pressed ? COLORS.lightYellow : COLORS.white}, styles.pressable]}
  >
    <View style={styles.itemsWrapper}>
      <Text style={styles.item} numberOfLines={1}>{title}</Text>
    </View>
  </Pressable>
)

const Divider = () => (
  <View style={styles.divider}></View>
)

const Handler = ({ recipes, handleAddRecipe, setAddRecipeModalVisible, handleRemoveRecipe }) => (
  <>
    <View style={styles.handlerView}>
      <AddRecipeBtn setAddRecipeModalVisible={setAddRecipeModalVisible} />
      {recipes.length > 0 ?
        <ShoppingHandler
          recipes={recipes}
          handleAddRecipe={handleAddRecipe}
          handleRemoveRecipe={handleRemoveRecipe}
          backgroundColor='transparent'
          text='Shop'
        />
      :
        <></>
      }
    </View>
    <Divider />
  </>
)

export default function HomePage({
  recipes,
  selectRecipe,
  closeNav,
  handleAddRecipe,
  setAddRecipeModalVisible,
  handleRemoveRecipe
}) { 
  return (
    <>
      <TouchableWithoutFeedback onPress={closeNav}>
        <View style={styles.view}>
          <FlatList
            data={recipes}
            renderItem={({ item }) => <Item title={item.title} selectRecipe={selectRecipe} />}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={Divider}
            ListHeaderComponent={
              <Handler
                recipes={recipes}
                handleAddRecipe={handleAddRecipe}
                setAddRecipeModalVisible={setAddRecipeModalVisible}
                handleRemoveRecipe={handleRemoveRecipe}
              />
            }
            ListFooterComponent={Divider}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  handlerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 30
  },
  view: {
    alignItems: 'center',
    height: '100%',
    marginBottom: 20
  },
  itemsWrapper: {
    padding: 18
  },
  item: {
    color: COLORS.darkYellow,
    fontSize: 18,
    fontWeight: '600'
  },
  pressable: {
    borderRadius: 5
  },
  divider: {
    height: 3,
    width: '100%',
    backgroundColor: COLORS.medDarkYellow
  }
})