import React, { useState } from 'react';
import { FlatList } from 'react-native';
import RecipeTabs from './recipeTabs';
import RecipeItem from './recipeItem';
import DirectionSteps from './directionSteps';

export default function recipeHandler({
  ingredients,
  directions,
  recipeTitle,
  handleCheckedItem,
  handleItemChange,
  handleAddNewLine,
  handleRemoveItemLine,
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

  const renderDirectionItem = ({ item, index }) => (
    <DirectionSteps
      value={item.item}
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

  return (
    <>
      <RecipeTabs
        tabs={recipeTitle === 'Shopping List' ? [] : tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setCurrentIndex={setCurrentIndex}
      />
      {selectedTab === 'Ingredients' ? 
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      :
        <FlatList
          data={directions}
          renderItem={renderDirectionItem}
          keyExtractor={(item, index) => index.toString()}
        />
      }
    </>
  )
}
