import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomModal from './modal';
import { COLORS } from '../config/colors';

export default function handleNavItems({ handleAddRecipe, selectRecipe }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.view}>
      <CustomModal handleAddRecipe={handleAddRecipe} modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Pressable
        onPress={() => selectRecipe('My Recipes')}
        style={({ pressed }) => [styles.pressableHome, {backgroundColor: pressed ? COLORS.unitedNations : COLORS.littleBoy}]}
      >
        <Text style={styles.home}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name={'ios-add'} size={40} color={COLORS.littleBoy} style={styles.addIcon} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    marginTop: 30
  },
  pressableHome: {
    padding: 10,
    width: '75%',
    borderRadius: 5,
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.4
  },
  home: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    color: COLORS.white
  },
  addIcon: {
    backgroundColor: 'transparent',
    shadowColor: COLORS.jet,
    shadowOffset: {
      width: 2,
      height: 1
    },
    shadowOpacity: 0.4
  }
})