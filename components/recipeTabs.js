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
          setCurrentIndex(-1)
        }}
        style={[styles.tab, selectedTab === tab ? styles.selectedTab : {}]}
        key={tab}
      >
        <Text style={[styles.ingredientsTitle, selectedTab === tab ? styles.selectedTabTitle : {}]}>{tab}</Text>
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
    borderBottomColor: COLORS.xanadu
  },
  selectedTabTitle: {
    color: COLORS.xanadu
  },
  ingredientsTitle: {
    fontWeight: '600',
    fontSize: 24,
    color: COLORS.artichoke
  }
})