import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import firebase from 'firebase'
require('firebase/firestore');
import apiKeys from './config/keys';
import SideNav from './components/sideNav';
import RecipeTitle from './components/recipeTitle';
import RecipeItem from './components/recipeItem';
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
    ]
  },
  {
    'title': 'Brussel Tacos',
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
      }
    ]
  },
  {
    'title': 'Kale Caesar',
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
      }
    ]
  },
  {
    'title': 'Gorgonzola Red Sauce Pasta',
    'body': [
      {
        item: '2 cans tomatoes',
        checked: false
      }
    ]
  }
]

export default function App() {
  const [appReady, setAppReady] = useState(false)
  const [userName, setUserName] = useState('')
  const [userFavFood, setUserFavFood] = useState('')
  const [collectionName, setCollectionName] = useState('')
  const [recipes, setRecipes] = useState([])
  const [navOpen, setNavOpen] = useState(false)
  const [iconRotate, setIconRotate] = useState('0deg')
  const [navContainerSize, setNavContainerSize] = useState(16)
  const [iconPosition, setIconPosition] = useState(8)
  const [recipeTitle, setRecipeTitle] = useState('My Recipes')
  const [recipeBody, setRecipeBody] = useState([])
  const [inputActive, setInputActive] = useState(true)
  const [currentItemIndex, setCurrentItemIndex] = useState()
  const inputEl = useRef(null);
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

    if (!inputActive && Platform.OS === 'ios') {
      inputEl.current._children[currentItemIndex]._children[1].focus()
      setInputActive(true)
    }

    // let keys = ['@userName', '@userFavFood', '@userCollectionName'];
    // AsyncStorage.multiRemove(keys, (err) => {
    //   // keys k1 & k2 removed, if they existed
    //   // do most stuff after removal (if you want)
    // });
  });

  const openNav = () => {
    setIconRotate('180deg')
    setNavContainerSize(2)
    setIconPosition(1)
    setNavOpen(true)
  }

  const closeNav = () => {
    setIconRotate('0deg')
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
  }

  const selectRecipe = (title) => {
    if(title != recipeTitle) {
      setRecipeTitle(title)
    }
    recipes.map(recipe => {
      if (recipe.title === title) {
        setRecipeBody(recipe.body)
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

  const handleAddRecipe = (title) => {
    let allRecipes = [...recipes]
    let newRecipe = {
      'title': `${title}`,
      'body': [
        {
          item: '',
          checked: false
        }
      ]
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
    setCurrentItemIndex(index)
    console.log(index)
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
              iconRotate={iconRotate}
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
                      <ScrollView>
                        <TouchableWithoutFeedback onPress={navOpen ? closeNav : handleExitKeyboard}>
                          {recipeTitle === 'My Recipes' ?
                            <HomePage
                              recipes={recipes}
                              selectRecipe={selectRecipe}
                              navOpen={navOpen}
                              closeNav={closeNav}
                            />
                            :
                            <View style={styles.inputAreaInner} ref={inputEl}>
                              <Text style={styles.ingredientsTitle}>Ingredients</Text>
                              {recipeBody.map((item, index) =>
                                <RecipeItem
                                  value={item.item}
                                  closeNav={closeNav}
                                  key={index}
                                  index={index}
                                  checked={item.checked}
                                  handleCheckedItem={handleCheckedItem}
                                  handleItemChange={handleItemChange}
                                  handleAddNewLine={handleAddNewLine}
                                  handleRemoveItemLine={handleRemoveItemLine}
                                  currentItemIndex={currentItemIndex}
                                  setCurrentItemIndex={setCurrentItemIndex}
                                />
                              )}
                            </View>
                          }
                        </TouchableWithoutFeedback>
                      </ScrollView>
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
  },
  recipeAreaBody: {
    // height: (window.height / 6) * 5
  },
  mainViewContainer: {
    flex: 1,
    fontFamily: 'Roboto_500Medium'
  },
  mainViewWrapper: {
    height: window.height,
    zIndex: 0
  },
  ingredientsTitle: {
    fontSize: 24,
    paddingBottom: 18
  }
})
