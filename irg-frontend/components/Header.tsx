import { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Text,
    Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native'
import { useCartaSearch } from '../contexts/SearchContext'
import { useRouter } from 'expo-router'

export default function Header() {
    const [search, setSearch] = useState('')
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
    const { nombresPlatos, buscarYScroll } = useCartaSearch()
    const router = useRouter()

    useEffect(() => {
        if (search.trim() === '') {
            setFilteredSuggestions([])
        } else {
            const lowerSearch = search.toLowerCase()
            const filtered = nombresPlatos.filter(n =>
                n.toLowerCase().includes(lowerSearch)
            )
            setFilteredSuggestions(filtered)
        }
    }, [search, nombresPlatos])

    const handleSelect = (name: string) => {
        setSearch(name)
        setFilteredSuggestions([])
        Keyboard.dismiss()
        setTimeout(() => buscarYScroll(name), 100)
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={28} color="#000" />
                </TouchableOpacity>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar en la carta..."
                        value={search}
                        onChangeText={setSearch}
                        onSubmitEditing={() => handleSelect(search)}
                    />
                    {filteredSuggestions.length > 0 && (
                        <FlatList
                            data={filteredSuggestions}
                            keyExtractor={(item) => item}
                            style={styles.suggestionsList}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.suggestionItem}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#f2ebdd',
        paddingVertical: 14,
        zIndex: 100,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f2ebdd',
        zIndex: 100,
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    searchContainer: {
        flex: 1,
        position: 'relative',
        zIndex: 100,
    },
    searchInput: {
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#a3a3a3',
        borderWidth: 1,
        fontSize: 14,
        paddingHorizontal: 10,
        height: 44,
    },
    suggestionsList: {
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        maxHeight: 200,
        zIndex: 100,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
})