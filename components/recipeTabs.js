import React from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { COLORS } from '../config/colors';

export default function RecipeTabs({ tabs, selectedTab, setSelectedTab, setCurrentIndex }) {
  return (
    <View style={styles.view}>
    {tabs.map(tab => (
      <Pressable
        onPress={() => {
          setSelectedTab(tab)
          setCurrentIndex()
        }}
        style={[
          styles.tab,
          {borderBottomWidth: selectedTab === tab ? 3 : 0},
          {borderBottomColor: tab === 'Ingredients' ? COLORS.darkYellow : COLORS.medDarkRed}
        ]}
        key={tab}
      >
        <Text style={[
          styles.ingredientsTitle,
          {color: selectedTab === tab ?
            (tab === 'Ingredients' ? COLORS.darkYellow : COLORS.medDarkRed)
            :
            (tab === 'Directions' ? COLORS.mediumRed : COLORS.medDarkYellow)
          }
        ]}
        >{tab}</Text>
      </Pressable>
    ))}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginBottom: 24
  },
  tab: {
    marginRight: 15,
    paddingBottom: 5,
  },
  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.darkGreen
  },
  ingredientsTitle: {
    fontWeight: '600',
    fontSize: 24
  }
})