import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Text, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../config/colors';

export default function firstScreen({ window, handleExitKeyboard, setUserName, setUserFavFood, setCollectionName, getUserData }) {
  const [user, onChangeUser] = useState('');
  const [food, onChangeFood] = useState('');

  const setUserData = () => {
    setUserName(user)
    setUserFavFood(food)
    const collectionName = `${user.trim().replace(' ', '-').toLowerCase()}${food.trim().replace(' ', '-').toLowerCase()}`
    setCollectionName(collectionName)
    storeUserData(user, food, collectionName)
    getUserData()
  }

  const storeUserData = async (user, food, collectionName) => {
    try {
      await AsyncStorage.setItem('@userName', user)
    } catch (e) {
      console.log(e)
    }
    try {
      await AsyncStorage.setItem('@userFavFood', food)
    } catch (e) {
      console.log(e)
    }
    try {
      await AsyncStorage.setItem('@userCollectionName', collectionName)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleExitKeyboard} style={{fontFamily: 'Roboto_500Medium'}}>
      <View style={styles.view}>
        <Text style={styles.title}>My Recipes</Text>
        <View style={styles.inputView}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={[styles.input, {width: window.width / 1.75}]}
            onChangeText={text => onChangeUser(text)}
            placeholder='Jeffrey...'
            value={user}
          />
          <Text style={styles.inputLabel}>Favorite Food</Text>
          <TextInput
            style={[styles.input, {width: window.width / 1.75}]}
            onChangeText={text => onChangeFood(text)}
            placeholder='Pizza...'
            value={food}
          />
          <TouchableHighlight
            style={styles.submitBtn}
            onPress={setUserData}
            underlayColor={COLORS.unitedNations}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start'
  },
  title: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '600',
    paddingTop: 120,
    color: COLORS.blueGray
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 120
  },
  input: {
    alignSelf: 'center',
    borderColor: COLORS.salmon,
    borderWidth: 2,
    borderRadius: 4,
    height: 45,
    paddingLeft: 10,
    margin: 20,
    marginTop: 5
  },
  inputLabel: {
    width: '55%',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.salmon
  },
  submitBtn: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.littleBoy,
    borderRadius: 4,
    marginTop: 10
  },
  submitText: {
    alignSelf: 'center',
    fontSize: 20,
    color: COLORS.white
  }
})