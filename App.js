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

const dummyData = [
  {
    'title': 'Tikka Masala',
    'body': [
      {
        item: '2 cans tomatoes',
        checked: false
      },
      {
        item: 'spices',
        checked: false
      },
      {
        item: 'basmati rice',
        checked: false
      },
      {
        item: 'yogurt',
        checked: false
      },
      {
        item: 'veggies',
        checked: false
      }
    ],
    'directions': ''
  }
]

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
  const [recipeDirections, setRecipeDirections] = useState('')
  const [inputActive, setInputActive] = useState(true)
  const [currentIndex, setCurrentIndex] = useState()
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
            docs.forEach(doc => array.push(doc.data()))
            setRecipes(array)
          } else {
            setRecipes(dummyData)
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
    setCurrentIndex(-1)
  }

  const selectRecipe = (title) => {
    if(title != recipeTitle) {
      setRecipeTitle(title)
    }
    recipes.map(recipe => {
      if (recipe.title === title) {
        setRecipeBody(recipe.body)
        if (!recipe.directions) {
          setRecipeDirections('')
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

  const setAllRecipeDirectionsData = (text) => {
    let allRecipes = [...recipes]
    const recipeIndex = allRecipes.findIndex(obj => obj.title === recipeTitle)
    let recipe = {...allRecipes[recipeIndex]}
    recipe.directions = text
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

  const handleAddRecipe = (title, body) => {
    let allRecipes = [...recipes]
    let newRecipe = {
      'title': `${title}`,
      'body': body
    }
    allRecipes.unshift(newRecipe)
    allRecipes.map(eachRecipe => dbh.collection(collectionName).doc(eachRecipe.title).set(eachRecipe))
    setRecipes(allRecipes)
  }

  const handleItemChange = (index, text) => {
    if (inputActive) {
      let items = [...recipeBody]
      let item = {...items[index]}
      item.item = text
      items[index] = item
      setRecipeBody(items)
  
      setAllRecipeData(items)
    }
  }

  const handleAddNewLine = (newItemIndex, index, text) => {
    let items = [...recipeBody]
    let newItem = {
      item: text,
      checked: false
    }
    items.splice(index + 1, 0, newItem)
    setRecipeBody(items)
    
    setAllRecipeData(items)
  }

  const handleRemoveItemLine = (index) => {
    setInputActive(false)
    let items = [...recipeBody]
    items.splice(index, 1)
    setRecipeBody(items)

    setAllRecipeData(items)
  }

  const handleCheckedItem = (index, checked) => {
    let items = [...recipeBody]
    let item = {...items[index]}
    item.checked = checked
    items[index] = item
    setRecipeBody(items)

    setAllRecipeData(items)
  }

  const handleSetRecipeDirections = (text) => {
    setRecipeDirections(text)

    setAllRecipeDirectionsData(text)
  }

  const handleExitKeyboard = () => {
    Keyboard.dismiss()
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
                          toggleNav={toggleNav}
                          handleAddRecipe={handleAddRecipe}
                        />
                        :
                        <View style={styles.inputAreaInner}>
                          <RecipeHandler
                            recipes={recipeBody}
                            recipeTitle={recipeTitle}
                            handleCheckedItem={handleCheckedItem}
                            handleItemChange={handleItemChange}
                            handleAddNewLine={handleAddNewLine}
                            handleRemoveItemLine={handleRemoveItemLine}
                            recipeDirections={recipeDirections}
                            handleSetRecipeDirections={handleSetRecipeDirections}
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
    flex: 1
  },
  inputAreaInner: {
    padding: 24,
    paddingLeft: window.width / 8,
    flex: 1
  },
  recipeAreaContainer: {
    justifyContent: 'flex-end',
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
