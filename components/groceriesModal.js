import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableHighlight, FlatList, TouchableWithoutFeedback } from 'react-native';
import { COLORS } from '../config/colors';
import RecipeSelectList from './recipeSelectList';

export default function GroceriesModal({
  modalVisible,
  setModalVisible,
  recipes,
  selectedRecipes,
  setSelectedRecipes,
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
        setModalVisible(!modalVisible)
      }}
    >
      <TouchableWithoutFeedback
        onPress={(() => setModalVisible(!modalVisible))}
        underlayColor='transparent'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Shopping List</Text>
            <Text style={styles.modalSubText}>Select recipes to include in your shopping list</Text>
            <FlatList
              data={recipes}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatlist}
            />
            <View style={styles.btnView}>
              <TouchableHighlight
                style={{...styles.modalBtn, backgroundColor: COLORS.lightGray}}
                underlayColor={COLORS.medGray}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setSelectedRecipes([])
                }}
              >
                <Text style={{...styles.textStyle, color: COLORS.darkGray}}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.modalBtn}
                underlayColor={COLORS.darkBlue}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  makeShoppingList(selectedRecipes)
                  setSelectedRecipes([])
                }}
              >
                <Text style={styles.textStyle}>Next</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    padding: 70,
    alignItems: 'center',
    shadowColor: COLORS.darkGray,
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
    backgroundColor: COLORS.medDarkBlue,
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
    fontSize: 30,
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