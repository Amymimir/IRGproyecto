import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { restaurantsData } from '../../constants/data';

export default function RestoBuscador() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const allRestaurantKeys = Object.keys(restaurantsData);

    const uniqueRestaurantMap = new Map<string, { key: string; name: string }>();
    allRestaurantKeys.forEach(key => {
        const name = restaurantsData[key].name.toLowerCase();
        if (!uniqueRestaurantMap.has(name)) {
            uniqueRestaurantMap.set(name, { key, name: restaurantsData[key].name });
        }
    });

    const uniqueRestaurants = Array.from(uniqueRestaurantMap.values());

    const filteredSuggestions = uniqueRestaurants.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSearch = () => {
        const matched = uniqueRestaurants.find(item =>
            item.name.toLowerCase() === search.trim().toLowerCase()
        );

        if (matched) {
            setSearch('');
            router.push(`./restaurantes/${matched.key}`);
        } else {
            Alert.alert('Restaurante no encontrado');
        }
    };

    const handleSelectSuggestion = (key: string, name: string) => {
        setSearch(name);
        router.push(`./restaurantes/${key}`);
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>¿En qué restaurante estás?</Text>
            <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Ej: Astor, El Rey de los Tacos"
                style={styles.input}
            />
            {search.length > 0 && (
                <ScrollView style={styles.suggestionsContainer}>
                    {filteredSuggestions.map(item => (
                        <TouchableOpacity
                            key={item.key}
                            style={styles.suggestionItem}
                            onPress={() => handleSelectSuggestion(item.key, item.name)}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                    {filteredSuggestions.length === 0 && (
                        <View style={styles.suggestionItem}>
                            <Text>No se encontraron coincidencias</Text>
                        </View>
                    )}
                </ScrollView>
            )}
            <Button title="Buscar" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        backgroundColor: "#f2ebdd"
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    suggestionsContainer: {
        maxHeight: 150,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20
    }
});
