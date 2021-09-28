import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { COLORS } from '../config/colors'
import { MaterialIcons } from '@expo/vector-icons';

export default function AddRecipeBtn({ setAddRecipeModalVisible }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        {backgroundColor: pressed ? COLORS.darkBlue : COLORS.medDarkBlue}
      ]}
      onPress={() => setAddRecipeModalVisible(true)}
    >
      <Text style={styles.btnText}>Recipe</Text>
      <MaterialIcons name="post-add" size={30} color={COLORS.white} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingRight: 6,
    borderRadius: 5,
    shadowColor: COLORS.darkGray,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.4,
    marginRight: 15
  },
  btnText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '600',
    marginRight: 5
  }
})