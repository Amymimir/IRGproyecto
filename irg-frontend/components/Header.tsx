import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'

export default function Header() {
    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleSearchChange = (text: string) => {
        setSearch(text)
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={28} color="#000" />
                </TouchableOpacity>
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
        marginVertical: 18,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f2ebdd',
    },
    backButton: {
        padding: 4,
        marginRight: 30,
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#a3a3a3',
        borderWidth: 1,
        fontSize: 14,
        paddingHorizontal: 10,
        height: 44,
    },
})
