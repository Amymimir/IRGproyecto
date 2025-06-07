import { View, Text, StyleSheet, Pressable, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef } from 'react';

export default function SeleccionUser() {
    const router = useRouter();

    const scaleAnimCliente = useRef(new Animated.Value(1)).current;
    const scaleAnimResto = useRef(new Animated.Value(1)).current;

    const animateIn = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const animateOut = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handleCliente = () => {
        router.replace('/cliente/register');
    };

    const handleRestaurante = () => {
        router.push('/admin/escribirClave');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cata Oculta</Text>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.subtitle}>¿Cómo querés ingresar?</Text>

            <View style={styles.buttonsContainer}>
                <Animated.View style={{ transform: [{ scale: scaleAnimCliente }], width: '100%' }}>
                    <Pressable
                        onPressIn={() => animateIn(scaleAnimCliente)}
                        onPressOut={() => animateOut(scaleAnimCliente)}
                        onPress={handleCliente}
                        style={[styles.button, styles.clienteButton]}
                    >
                        <FontAwesome5 name="user-alt" size={18} color="#fff" style={styles.icon} />
                        <Text style={styles.buttonText}>Cliente</Text>
                    </Pressable>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: scaleAnimResto }], width: '100%' }}>
                    <Pressable
                        onPressIn={() => animateIn(scaleAnimResto)}
                        onPressOut={() => animateOut(scaleAnimResto)}
                        onPress={handleRestaurante}
                        style={[styles.button, styles.restauranteButton]}
                    >
                        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#fff" style={styles.icon} />
                        <Text style={styles.buttonText}>Restaurante</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2ebdd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 20,
        marginTop: 125,
        marginBottom: 25,
        textAlign: 'center',
        fontFamily: 'Playfair',
        color: '#6c1f2c',
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 15,
    },
    clienteButton: {
        backgroundColor: '#A83247',
    },
    restauranteButton: {
        backgroundColor: '#4C1B26',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10,
    },
    icon: {
        marginRight: 5,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        marginVertical: 30,
    },
});