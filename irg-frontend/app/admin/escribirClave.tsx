import { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

const codigosValidos = ['astor2024', 'tacos2023'];

export default function EscribirClave() {
    const [codigo, setCodigo] = useState('');
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

    const handleSearch = () => {
        const formatted = codigo.trim().toLowerCase();

        if (formatted.length !== 9) {
            Alert.alert('Código inválido', 'El código debe tener 9 caracteres.');
            return;
        }

        if (codigosValidos.includes(formatted)) {
            router.push({ pathname: '/admin/restaurantesAdmin/eleccionResto', params: { codigo: formatted } });
        } else {
            Alert.alert('Código incorrecto', 'No se encontró ningún restaurante con ese código.');
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.replace('../')} style={styles.backButton}>
                <ArrowLeft size={30} color="#000" />
            </Pressable>

            <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Ingresá el código de tu Restaurante</Text>

            <TextInput
                value={codigo}
                onChangeText={setCodigo}
                placeholder="Ej: astor2024"
                style={styles.input}
                autoCapitalize="none"
                maxLength={9}
                placeholderTextColor="#999"
            />

            <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
                <Pressable
                    onPressIn={animateIn}
                    onPressOut={animateOut}
                    onPress={handleSearch}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
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
    backButton: {
        position: 'absolute',
        top: 17,
        left: 15,
        zIndex: 1,
        padding: 7,
    },
    logo: {
        width: 100,
        height: 100,
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
        marginBottom: 20,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1.2,
    },
    button: {
        backgroundColor: '#4C1B26',
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
        fontSize: 17,
        fontWeight: 'bold',
    },
});