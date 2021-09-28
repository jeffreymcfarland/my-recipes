import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { COLORS } from '../config/colors'
import { MaterialIcons } from '@expo/vector-icons';

export default function AddRecipeBtn({ setAddRecipeModalVisible }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        {backgroundColor: pressed ? COLORS.lightBlue : COLORS.white}
      ]}
      onPress={() => setAddRecipeModalVisible(true)}
    >
      <Text style={styles.btnText}>Recipe</Text>
      <MaterialIcons name="post-add" size={30} color={COLORS.darkBlue} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 5
  },
  btnText: {
    color: COLORS.darkBlue,
    fontSize: 24,
    fontWeight: '600',
    marginRight: 5
  }
})