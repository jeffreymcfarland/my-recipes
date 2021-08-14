import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Dimensions, 
    Image, 
    TouchableWithoutFeedback } from 'react-native';

const window = Dimensions.get('window')

export default function SideNav() {
    const [navOpen, setNavOpen] = useState(false)
    const [iconRotate, setIconRotate] = useState('0deg')
    const [navContainerSize, setNavContainerSize] = useState(10)
    const [iconPosition, setIconPosition] = useState(5)
    
    const toggleNav = () => {
      if (!navOpen) {
        setIconRotate('180deg')
        setNavContainerSize(2)
        setIconPosition(1)
        setNavOpen(true)
      } else {
        setIconRotate('0deg')
        setNavContainerSize(10)
        setIconPosition(5)
        setNavOpen(false)
      }
    }

    return (
      <TouchableWithoutFeedback style={openIcon.button} onPress={toggleNav}>
        <View 
          style={[sideNav.container, {
            width: window.width / navContainerSize
          }]}
        >
          <View
            style={[openIcon.container, {
              width: window.width / iconPosition
            }]}
          >
              <View style={openIcon.icon}>
                <Image
                  source={require('../assets/chevron.png')}
                  style={[openIcon.chevron, {
                    transform: [
                      {rotate: iconRotate}
                    ]
                  }]}
                />
              </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
}

const sideNav = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        height: '100%',
        zIndex: 1,
        position: 'absolute',
        borderRightWidth: 2,
        borderColor: '#282828',
        shadowColor: '#282828',
        shadowOffset: {
        width: 4,
        height: 0
        },
        shadowOpacity: 0.2
    }
})

const openIcon = StyleSheet.create({
    container: {
      position: 'absolute',
      top: '50%',
      alignItems: 'center'
    },
    icon: {
      width: 35,
      height: 35,
      backgroundColor: 'transparent',
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#282828',
      shadowOffset: {
        width: 4,
        height: 0
      },
      shadowOpacity: 0.2
    },
    chevron: {
      width: 35,
      height: 35
    },
    button: {
      backgroundColor: 'transparent'
    }
  })