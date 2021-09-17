import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Directions from './directions';
import RecipeTabs from './recipeTabs';
import RecipeItem from './recipeItem';

export default function recipeHandler({
  recipes,
  closeNav,
  handleCheckedItem,
  handleItemChange,
  handleAddNewLine,
  handleRemoveItemLine,
  recipeDirections,
  handleSetRecipeDirections,
  currentIndex,
  setCurrentIndex
}) {
  const [tabs, setTabs] = useState([
    'Ingredients',
    'Directions'
  ])
  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const renderItem = ({ item, index }) => (
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
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
    />
  );

  useEffect(() => {
    
  })

  return (
    <>
      <RecipeTabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setCurrentIndex={setCurrentIndex}
      />
      {selectedTab === 'Ingredients' ? 
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      :
        <Directions recipeDirections={recipeDirections} handleSetRecipeDirections={handleSetRecipeDirections} />
      }
    </>
  )
}
