import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { CartaSearchProvider } from '../contexts/SearchContext'
import { RestoProvider } from '../contexts/RestoContext'
import { View, StyleSheet, useWindowDimensions } from 'react-native'

export default function RootLayout() {
  const { width } = useWindowDimensions()
  const isWide = width > 500

  return (
    <SafeAreaProvider>
      <CartaSearchProvider>
        <RestoProvider>
          <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {isWide ? (
              <View style={styles.outer}>
                <View style={styles.inner}>
                  <Slot />
                </View>
              </View>
            ) : (
              <View style={styles.full}>
                <Slot />
              </View>
            )}
          </SafeAreaView>
        </RestoProvider>
      </CartaSearchProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 400,
    height: '100%',
    backgroundColor: '#f2ebdd',
  },
  full: {
    flex: 1,
    backgroundColor: '#f2ebdd',
  },
})