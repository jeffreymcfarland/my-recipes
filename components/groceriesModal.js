import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableHighlight, FlatList, Alert } from 'react-native';
import { COLORS } from '../config/colors';
import RecipeSelectList from './recipeSelectList';

export default function GroceriesModal({
  modalVisible,
  setModalVisible,
  recipes,
  selectedRecipes,
  setSelectedRecipes,
  handleAddRecipe,
  makeShoppingList }) {

  const renderItem = ({ item, index }) => (
    <RecipeSelectList
      title={item.title}
      selectedRecipes={selectedRecipes}
      setSelectedRecipes={setSelectedRecipes}
    />
  );

  return(
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Select Recipes</Text>
          <Text style={styles.modalSubText}>to include in your grocery list</Text>
          <FlatList
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatlist}
          />
          <View style={styles.btnView}>
            <TouchableHighlight
              style={{...styles.modalBtn, backgroundColor: COLORS.cultured}}
              underlayColor={COLORS.platinum}
              onPress={() => {
                setModalVisible(!modalVisible)
                setSelectedRecipes([])
              }}
            >
              <Text style={{...styles.textStyle, color: COLORS.jet}}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.modalBtn}
              underlayColor={COLORS.blueGray}
              onPress={() => {
                setModalVisible(!modalVisible)
                makeShoppingList(selectedRecipes)
                setSelectedRecipes([])
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  btnView: {
    flexDirection: 'row'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  flatlist: {
    flexGrow: 0,
    marginBottom: 20
  },
  modalBtn: {
    backgroundColor: COLORS.cerulean,
    borderRadius: 6,
    padding: 10,
    elevation: 2,
    margin: 2.5
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18
  },
  modalText: {
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700'
  },
  modalSubText: {
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  }
})