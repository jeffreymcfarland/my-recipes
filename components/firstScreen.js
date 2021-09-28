import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Text, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../config/colors';
import ErrorMessage from './errorMessage';

export default function firstScreen({ window, handleExitKeyboard, setUserName, setUserFavFood, setCollectionName, getUserData }) {
  const [user, onChangeUser] = useState('')
  const [food, onChangeFood] = useState('')
  const [isNameEmpty, setIsNameEmpty] = useState(false)
  const [isFoodEmpty, setIsFoodEmpty] = useState(false)

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
            style={[styles.input, {width: window.width / 1.75}, isNameEmpty ? styles.emptyInput : {}]}
            onChangeText={text => {
              setIsNameEmpty(false)
              onChangeUser(text)
            }}
            placeholder={isNameEmpty ? '' : 'Jeffrey...'}
            value={user}
          />
          <ErrorMessage isShown={isNameEmpty} />
          <Text style={styles.inputLabel}>Favorite Food</Text>
          <TextInput
            style={[styles.input, {width: window.width / 1.75}, isFoodEmpty ? styles.emptyInput : {}]}
            onChangeText={text => {
              setIsFoodEmpty(false)
              onChangeFood(text)
            }}
            placeholder={isFoodEmpty ? '' : 'Pizza...'}
            value={food}
          />
          <ErrorMessage isShown={isFoodEmpty} />
          <TouchableHighlight
            style={styles.submitBtn}
            onPress={() => {
              if (user === '' && food === '') {
                setIsNameEmpty(true)
                setIsFoodEmpty(true)
              } else if (user === '') {
                setIsNameEmpty(true)
              } else if (food === '') {
                setIsFoodEmpty(true)
              } else {
                setIsNameEmpty(false)
                setIsFoodEmpty(false)
                setUserData()
              }
            }}
            underlayColor={COLORS.darkBlue}
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
    alignContent: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '600',
    paddingTop: 120,
    color: COLORS.darkBlue
  },
  inputView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: 150
  },
  input: {
    alignSelf: 'center',
    borderColor: COLORS.medDarkYellow,
    borderWidth: 2,
    borderRadius: 4,
    height: 45,
    paddingLeft: 10,
    marginBottom: 30,
    marginTop: 5
  },
  emptyInput: {
    marginBottom: 5,
    borderColor: COLORS.darkRed
  },
  inputLabel: {
    width: '55%',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.medDarkYellow
  },
  submitBtn: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.medDarkBlue,
    borderRadius: 4,
    marginTop: 10
  },
  submitText: {
    alignSelf: 'center',
    fontSize: 20,
    color: COLORS.white
  }
})