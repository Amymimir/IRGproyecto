import React, { useState } from 'react'
import { View, StyleSheet, Image, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { restaurantsData } from '../constants/data'

type HeaderProps = {
    restaurantName: string
    codigo: string
}

export default function Header({ codigo }: HeaderProps) {
    const restaurant = restaurantsData[codigo]
    const [search, setSearch] = useState('')

    const handleSearchChange = (text: string) => {
        setSearch(text)
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
            <View style={styles.headerRow}>
                {restaurant?.logo && (
                    <Image source={restaurant.logo} style={styles.logo} resizeMode="contain" />
                )}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar en la carta..."
                    value={search}
                    onChangeText={handleSearchChange}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#f2ebdd',
        marginBottom: 8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f2ebdd',
    },
    logo: {
        width: 65,
        height: 65,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 100,
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 14,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#a3a3a3',
        borderWidth: 1,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 44,
    },
})