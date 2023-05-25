import { View, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function RotatedSquare({ children }: Props) {
  const colorScheme = useColorScheme() || 'light'
  const colorName = colorScheme === 'dark' ? 'white' : 'black'

  return (
    <View style={[styles.container, { borderColor: colorName }]}>
      <View style={styles.children}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  children: {
    transform: [{ rotate: '-45deg' }],
  },
})
