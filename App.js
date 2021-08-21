import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { Platform, StyleSheet, View, Dimensions, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import SideNav from './components/sideNav';
import RecipeTitle from './components/recipeTitle';
import RecipeItem from './components/recipeItem';

const window = Dimensions.get('window')

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      'id': 0,
      'title': 'Tikka Masala',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes',
          checked: false
        },
        {
          id: 1,
          item: 'spices',
          checked: false
        },
        {
          id: 2,
          item: 'basmati rice',
          checked: false
        },
        {
          id: 3,
          item: 'yogurt',
          checked: false
        },
        {
          id: 4,
          item: 'veggies',
          checked: false
        }
      ]
    },
    {
      'id': 1,
      'title': 'Brussel Tacos',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes',
          checked: false
        },
        {
          id: 1,
          item: 'spices',
          checked: false
        },
        {
          id: 2,
          item: 'basmati rice',
          checked: false
        },
        {
          id: 3,
          item: 'yogurt',
          checked: false
        }
      ]
    },
    {
      'id': 2,
      'title': 'Kale Caesar',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes',
          checked: false
        },
        {
          id: 1,
          item: 'spices',
          checked: false
        },
        {
          id: 2,
          item: 'basmati rice',
          checked: false
        }
      ]
    },
    {
      'id': 3,
      'title': 'Gorgonzola Red Sauce Pasta',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes',
          checked: false
        }
      ]
    }
  ])

  const [navOpen, setNavOpen] = useState(false)
  const [iconRotate, setIconRotate] = useState('0deg')
  const [navContainerSize, setNavContainerSize] = useState(16)
  const [iconPosition, setIconPosition] = useState(8)
  const [recipeTitle, setRecipeTitle] = useState(recipes[0].title)
  const [recipeBody, setRecipeBody] = useState(recipes[0].body)
  const [inputActive, setInputActive] = useState(true)
  const inputEl = useRef(null);

  useEffect(() => {
    if (navOpen) {Keyboard.dismiss()}
    if (!inputActive && Platform.OS === 'ios') {
      inputEl.current._children[recipeBody.length - 1]._children[1].focus()
      setInputActive(true)
    }
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
  }

  const setAllRecipeData = (items) => {
    let allRecipes = [...recipes]
    const recipeIndex = allRecipes.findIndex(obj => obj.title === recipeTitle)
    let recipe = {...allRecipes[recipeIndex]}
    recipe.body = items
    allRecipes[recipeIndex] = recipe
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

  const handleAddNewLine = (index, text) => {
    let items = [...recipeBody]
    let newItem = {
      id: index,
      item: text,
      checked: false
    }
    items.push(newItem)
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

  return (
    <TouchableWithoutFeedback style={mainContainer.wrapper} onPress={navOpen ? closeNav : Keyboard.dismiss}>
      <View style={mainContainer.container}>
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
        />
        <View style={recipeArea.container}>
          <RecipeTitle title={recipeTitle} window={window} />
          <View style={recipeArea.body}>
            <KeyboardAvoidingView
              behavior='padding'
              style={inputArea.container}
            >
              <TouchableWithoutFeedback onPress={navOpen ? closeNav : Keyboard.dismiss}>
                <View style={inputArea.inner} ref={inputEl}>
                  {recipeBody.map(item =>
                    <RecipeItem
                      value={item.item}
                      closeNav={closeNav}
                      key={item.id + 1}
                      id={item.id}
                      checked={item.checked}
                      handleCheckedItem={handleCheckedItem}
                      navOpen={navOpen}
                      handleItemChange={handleItemChange}
                      newItemIndex={recipeBody.length}
                      handleAddNewLine={handleAddNewLine}
                      handleRemoveItemLine={handleRemoveItemLine}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const inputArea = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1
  }
})

const recipeArea = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    height: (window.height / 6) * 5,
    paddingLeft: window.width / 16
  }
})

const mainContainer = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    height: window.height,
    zIndex: 0
  }
})
