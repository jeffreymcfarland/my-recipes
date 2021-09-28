import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase'
require('firebase/firestore');
import apiKeys from './config/keys';
import SideNav from './components/sideNav';
import RecipeTitle from './components/recipeTitle';
import RecipeHandler from './components/recipeHandler';
import FirstScreen from './components/firstScreen';
import HomePage from './components/homePage';

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
} else {
  firebase.app();
}

const dbh = firebase.firestore();

const window = Dimensions.get('window')

export default function App() {
  const [appReady, setAppReady] = useState(false)
  const [userName, setUserName] = useState('')
  const [userFavFood, setUserFavFood] = useState('')
  const [collectionName, setCollectionName] = useState('')
  const [recipes, setRecipes] = useState([])
  const [navOpen, setNavOpen] = useState(false)
  const [navContainerSize, setNavContainerSize] = useState(16)
  const [iconPosition, setIconPosition] = useState(8)
  const [recipeTitle, setRecipeTitle] = useState('My Recipes')
  const [recipeBody, setRecipeBody] = useState([])
  const [recipeDirections, setRecipeDirections] = useState([])
  const [currentIndex, setCurrentIndex] = useState()
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  const getUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('@userName')
      if(user !== null) {
        setUserName(user)
      }
    } catch(e) {
      console.log(e)
    }
    try {
      const food = await AsyncStorage.getItem('@userFavFood')
      if(food !== null) {
        setUserFavFood(food)
      }
    } catch(e) {
      console.log(e)
    }
    try {
      const collection = await AsyncStorage.getItem('@userCollectionName')
      if(collection !== null) {
        setCollectionName(collection)
        dbh.collection(collection).get().then(docs => {
          let array = []
          if (docs.size !== 0) {
            docs.forEach(doc => {
              if (doc.data().title === 'Shopping List') {
                array.unshift(doc.data())
              } else {
                array.push(doc.data())
              }
            })
            setRecipes(array)
          }
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (navOpen) {Keyboard.dismiss()}

    // let keys = ['@userName', '@userFavFood', '@userCollectionName'];
    // AsyncStorage.multiRemove(keys, (err) => {
    //   // keys k1 & k2 removed, if they existed
    //   // do most stuff after removal (if you want)
    // });
  });

  const openNav = () => {
    setNavContainerSize(2)
    setIconPosition(1)
    setNavOpen(true)
  }

  const closeNav = () => {
    setNavContainerSize(16)
    setIconPosition(8)
    setNavOpen(false)
  }

  const toggleNav = () => {
    if (!navOpen) {
      openNav()
    } else {
      closeNav()
    }
    setCurrentIndex()
  }

  const selectRecipe = (title) => {
    if(title != recipeTitle) {
      setRecipeTitle(title)
    }
    recipes.map(recipe => {
      if (recipe.title === title) {
        setRecipeBody(recipe.body)
        if (!recipe.directions) {
          setRecipeDirections([{
            item: '',
            checked: false
          }])
        } else {
          setRecipeDirections(recipe.directions)
        }
      }
    })

    closeNav()
  }

  const setAllRecipeData = (items) => {
    let allRecipes = [...recipes]
    const recipeIndex = allRecipes.findIndex(obj => obj.title === recipeTitle)
    let recipe = {...allRecipes[recipeIndex]}
    recipe.body = items
    allRecipes[recipeIndex] = recipe
    allRecipes.map(eachRecipe => dbh.collection(collectionName).doc(eachRecipe.title).set(eachRecipe))
    setRecipes(allRecipes)
  }

  const setAllRecipeDirectionsData = (directions) => {
    let allRecipes = [...recipes]
    const recipeIndex = allRecipes.findIndex(obj => obj.title === recipeTitle)
    let recipe = {...allRecipes[recipeIndex]}
    recipe.directions = directions
    allRecipes[recipeIndex] = recipe
    allRecipes.map(eachRecipe => dbh.collection(collectionName).doc(eachRecipe.title).set(eachRecipe))
    setRecipes(allRecipes)
  }

  const handleRemoveRecipe = (title) => {
    let allRecipes = [...recipes]
    const recipeIndex = allRecipes.findIndex(obj => obj.title === title)
    allRecipes.splice(recipeIndex, 1)
    dbh.collection(collectionName).doc(title).delete().then(() => {
      console.log(`${title} deleted`)
    }).catch(e => {
      console.log(e)
    })
    setRecipes(allRecipes)
    selectRecipe('My Recipes')
    openNav()
  }

  const handleAddRecipe = (title, body, directions) => {
    let allRecipes = [...recipes]
    let newRecipe = {
      'title': `${title}`,
      'body': body,
      'directions': directions
    }
    allRecipes.unshift(newRecipe)
    allRecipes.map(eachRecipe => dbh.collection(collectionName).doc(eachRecipe.title).set(eachRecipe))
    setRecipes(allRecipes)

    setRecipeTitle(title)
    setRecipeBody(body)
    setRecipeDirections(directions)
    closeNav()
  }

  const handleItemChange = (index, text, listType) => {
    let items = []
    if (listType === 'ingredients') {
      items = [...recipeBody]
    } else {
      items = [...recipeDirections]
    }
    let item = {...items[index]}
    item.item = text.trim()
    items[index] = item

    if (listType === 'ingredients') {
      setRecipeBody(items)
      setAllRecipeData(items)
    } else {
      setRecipeDirections(items)
      setAllRecipeDirectionsData(items)
    }
  }

  const handleAddNewLine = (index, text, listType) => {
    let items = []
    if (listType === 'ingredients') {
      items = [...recipeBody]
    } else {
      items = [...recipeDirections]
    }
    let newItem = {
      item: text,
      checked: false
    }
    items.splice(index + 1, 0, newItem)

    if (listType === 'ingredients') {
      setRecipeBody(items)
      setAllRecipeData(items)
    } else {
      setRecipeDirections(items)
      setAllRecipeDirectionsData(items)
    }
  }

  const handleRemoveItemLine = (index, listType) => {
    let items = []
    if (listType === 'ingredients') {
      items = [...recipeBody]
    } else {
      items = [...recipeDirections]
    }
    items.splice(index, 1)

    if (listType === 'ingredients') {
      setRecipeBody(items)
      setAllRecipeData(items)
    } else {
      setRecipeDirections(items)
      setAllRecipeDirectionsData(items)
    }
  }

  const handleCheckedItem = (index, checked, listType) => {
    let items = []
    if (listType === 'ingredients') {
      items = [...recipeBody]
    } else {
      items = [...recipeDirections]
    }
    let item = {...items[index]}
    item.checked = checked
    items[index] = item

    if (listType === 'ingredients') {
      setRecipeBody(items)
      setAllRecipeData(items)
    } else {
      setRecipeDirections(items)
      setAllRecipeDirectionsData(items)
    }
  }

  const handleExitKeyboard = () => {
    Keyboard.dismiss()
    setCurrentIndex()
  }

  const handleAppLoading = () => {
    getUserData()
  }

  if (!fontsLoaded && !appReady) {
    return (
      <AppLoading
        startAsync={handleAppLoading}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    )
  } else {
    return (
      <>
      {userName === '' && userFavFood === '' ?
        <FirstScreen
          userName={userName}
          setUserName={setUserName}
          userFavFood={userFavFood}
          setUserFavFood={setUserFavFood}
          window={window}
          handleExitKeyboard={handleExitKeyboard}
          setCollectionName={setCollectionName}
          getUserData={getUserData}
        />
        :
        <TouchableWithoutFeedback style={styles.mainViewWrapper} onPress={() => navOpen ? closeNav : handleExitKeyboard}>
          <View style={styles.mainViewContainer}>
            <SideNav
              toggleNav={toggleNav}
              navOpen={navOpen}
              navContainerSize={navContainerSize}
              iconPosition={iconPosition}
              window={window}
              recipes={recipes}
              recipeTitle={recipeTitle}
              selectRecipe={selectRecipe}
              handleRemoveRecipe={handleRemoveRecipe}
              handleAddRecipe={handleAddRecipe}
              addRecipeModalVisible={addRecipeModalVisible}
              setAddRecipeModalVisible={setAddRecipeModalVisible}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={styles.inputAreaContainer}
            >
              <TouchableWithoutFeedback onPress={navOpen ? closeNav : handleExitKeyboard}>
                <View style={styles.recipeAreaContainer}>
                  <RecipeTitle title={recipeTitle} window={window} />
                  <View style={styles.recipeAreaBody}>
                    <TouchableWithoutFeedback onPress={navOpen ? closeNav : handleExitKeyboard}>
                      {recipeTitle === 'My Recipes' ?
                        <HomePage
                          recipes={recipes}
                          selectRecipe={selectRecipe}
                          closeNav={closeNav}
                          handleAddRecipe={handleAddRecipe}
                          setAddRecipeModalVisible={setAddRecipeModalVisible}
                          handleRemoveRecipe={handleRemoveRecipe}
                        />
                        :
                        <View style={styles.inputAreaInner}>
                          <RecipeHandler
                            ingredients={recipeBody}
                            directions={recipeDirections}
                            recipeTitle={recipeTitle}
                            handleCheckedItem={handleCheckedItem}
                            handleItemChange={handleItemChange}
                            handleAddNewLine={handleAddNewLine}
                            handleRemoveItemLine={handleRemoveItemLine}
                            currentIndex={currentIndex}
                            setCurrentIndex={setCurrentIndex}
                          />
                        </View>
                      }
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>
      }
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputAreaContainer: {
    // flex: 1
  },
  inputAreaInner: {
    padding: 24,
    paddingLeft: window.width / 8,
    flex: 1
  },
  recipeAreaContainer: {
    // justifyContent: 'flex-end',
    height: '100%'
  },
  recipeAreaBody: {
    flex: 1
  },
  mainViewContainer: {
    flex: 1,
    fontFamily: 'Roboto_500Medium'
  },
  mainViewWrapper: {
    height: window.height,
    zIndex: 0
  }
})
