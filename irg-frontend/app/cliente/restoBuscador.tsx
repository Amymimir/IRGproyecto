import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity, ScrollView, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { restaurantsData } from '../../constants/data';

export default function RestoBuscador() {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animateIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const animateOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

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
                placeholderTextColor="#999"
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

            <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
                <Pressable
                    onPressIn={animateIn}
                    onPressOut={animateOut}
                    onPress={handleSearch}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Buscar</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ebdd',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 25,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1.2,
        marginBottom: 15,
    },
    suggestionsContainer: {
        width: '100%',
        maxHeight: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        marginHorizontal: 15,
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    button: {
        backgroundColor: '#A83247',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 15,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18.5,
        fontWeight: 'bold',
    },
});