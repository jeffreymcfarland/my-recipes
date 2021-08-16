import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import SideNav from './components/sideNav';
import RecipeTitle from './components/recipeTitle';

const window = Dimensions.get('window')

export default function App() {
  const [recipes, setRecipes] = useState([
    {
      'id': 1,
      'title': 'Tikka Masala',
      'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus varius quam ut varius. Donec auctor eu enim quis viverra. Curabitur vitae tempus erat, a volutpat lorem. Aenean maximus justo interdum elit pharetra viverra. Nullam cursus dapibus purus eget cursus. Vivamus sed congue tellus, id convallis nunc. Nunc vehicula enim urna, eget posuere sapien lobortis a. Maecenas volutpat aliquet nisi, porta porttitor lorem vulputate placerat. Aliquam erat volutpat. Sed malesuada enim ex, et bibendum est convallis eget. Nunc rhoncus commodo eros, ut rutrum mauris. Suspendisse pharetra ut metus nec sollicitudin. Suspendisse consectetur volutpat neque. Aenean interdum condimentum porta. Praesent convallis, orci pellentesque laoreet iaculis, tellus massa tincidunt lectus, ac convallis tortor sapien sodales neque.'
    },
    {
      'id': 2,
      'title': 'Brussel Tacos',
      'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus varius quam ut varius. Donec auctor eu enim quis viverra. Curabitur vitae tempus erat, a volutpat lorem. Aenean maximus justo interdum elit pharetra viverra. Nullam cursus dapibus purus eget cursus. Vivamus sed congue tellus, id convallis nunc. Nunc vehicula enim urna, eget posuere sapien lobortis a. Maecenas volutpat aliquet nisi, porta porttitor lorem vulputate placerat. Aliquam erat volutpat. Sed malesuada enim ex, et bibendum est convallis eget. Nunc rhoncus commodo eros, ut rutrum mauris. Suspendisse pharetra ut metus nec sollicitudin. Suspendisse consectetur volutpat neque. Aenean interdum condimentum porta. Praesent convallis, orci pellentesque laoreet iaculis, tellus massa tincidunt lectus, ac convallis tortor sapien sodales neque.'
    },
    {
      'id': 3,
      'title': 'Kale Caesar',
      'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus varius quam ut varius. Donec auctor eu enim quis viverra. Curabitur vitae tempus erat, a volutpat lorem. Aenean maximus justo interdum elit pharetra viverra. Nullam cursus dapibus purus eget cursus. Vivamus sed congue tellus, id convallis nunc. Nunc vehicula enim urna, eget posuere sapien lobortis a. Maecenas volutpat aliquet nisi, porta porttitor lorem vulputate placerat. Aliquam erat volutpat. Sed malesuada enim ex, et bibendum est convallis eget. Nunc rhoncus commodo eros, ut rutrum mauris. Suspendisse pharetra ut metus nec sollicitudin. Suspendisse consectetur volutpat neque. Aenean interdum condimentum porta. Praesent convallis, orci pellentesque laoreet iaculis, tellus massa tincidunt lectus, ac convallis tortor sapien sodales neque.'
    },
    {
      'id': 4,
      'title': 'Gorgonzola Red Sauce Pasta',
      'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc finibus varius quam ut varius. Donec auctor eu enim quis viverra. Curabitur vitae tempus erat, a volutpat lorem. Aenean maximus justo interdum elit pharetra viverra. Nullam cursus dapibus purus eget cursus. Vivamus sed congue tellus, id convallis nunc. Nunc vehicula enim urna, eget posuere sapien lobortis a. Maecenas volutpat aliquet nisi, porta porttitor lorem vulputate placerat. Aliquam erat volutpat. Sed malesuada enim ex, et bibendum est convallis eget. Nunc rhoncus commodo eros, ut rutrum mauris. Suspendisse pharetra ut metus nec sollicitudin. Suspendisse consectetur volutpat neque. Aenean interdum condimentum porta. Praesent convallis, orci pellentesque laoreet iaculis, tellus massa tincidunt lectus, ac convallis tortor sapien sodales neque.'
    }
  ])

  const [navOpen, setNavOpen] = useState(false)
  const [iconRotate, setIconRotate] = useState('0deg')
  const [navContainerSize, setNavContainerSize] = useState(16)
  const [iconPosition, setIconPosition] = useState(8)
  const [recipeTitle, setRecipeTitle] = useState(recipes[0].title)

  useEffect(() => {
    
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
  }

  return (
    <TouchableWithoutFeedback style={mainContainer.wrapper} onPress={closeNav}>
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
        <RecipeTitle title={recipeTitle} />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const mainContainer = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    height: window.height,
    zIndex: 0
  }
})
