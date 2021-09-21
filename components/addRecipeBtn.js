import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { COLORS } from '../config/colors'
import { Ionicons } from '@expo/vector-icons';

export default function AddRecipeBtn({ setAddRecipeModalVisible }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressable,
        {backgroundColor: pressed ? COLORS.blueGray : COLORS.cerulean}
      ]}
      onPress={() => setAddRecipeModalVisible(true)}
    >
      <Text style={styles.btnText}>New Recipe</Text>
      <Ionicons name={'ios-add'} size={24} color={COLORS.white} />
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
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.4
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700'
  }
})