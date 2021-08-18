import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import SideNav from './components/sideNav';
import RecipeTitle from './components/recipeTitle';
import RecipeItem from './components/recipeItem';

const window = Dimensions.get('window')

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      'id': 1,
      'title': 'Tikka Masala',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes'
        },
        {
          id: 1,
          item: 'spices'
        },
        {
          id: 2,
          item: 'basmati rice'
        },
        {
          id: 3,
          item: 'yogurt'
        },
        {
          id: 4,
          item: 'veggies'
        }
      ]
    },
    {
      'id': 2,
      'title': 'Brussel Tacos',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes'
        },
        {
          id: 1,
          item: 'spices'
        },
        {
          id: 2,
          item: 'basmati rice'
        },
        {
          id: 3,
          item: 'yogurt'
        }
      ]
    },
    {
      'id': 3,
      'title': 'Kale Caesar',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes'
        },
        {
          id: 1,
          item: 'spices'
        },
        {
          id: 2,
          item: 'basmati rice'
        }
      ]
    },
    {
      'id': 4,
      'title': 'Gorgonzola Red Sauce Pasta',
      'body': [
        {
          id: 0,
          item: '2 cans tomatoes'
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

  useEffect(() => {
    // console.log('hello world')
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

  const handleItemChange = (key, text) => {
    let items = [...recipeBody]
    let item = {...items[key]}
    item.item = text
    items[key] = item
    setRecipeBody(items)
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
                <View style={inputArea.inner}>
                  {recipeBody.map(item =>
                    <RecipeItem
                      value={item.item}
                      closeNav={closeNav}
                      key={item.id + 1}
                      id={item.id}
                      handleItemChange={handleItemChange}
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
