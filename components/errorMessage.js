import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../config/colors';

export default function ErrorMessage({ isShown }) {
  return (
    <>
    {isShown ? <Text style={styles.errorMessage}>Field is required.</Text> : <></>}
    </>
  )
}

const styles = StyleSheet.create({
  errorMessage: {
    color: COLORS.darkRed,
    alignSelf: 'center',
    marginBottom: 11
  }
})