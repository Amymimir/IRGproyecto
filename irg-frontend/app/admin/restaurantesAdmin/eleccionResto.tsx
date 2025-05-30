import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { restaurantsData, restaurantAliases } from '../../../constants/data';

export default function EleccionRubroAdmin() {
    const router = useRouter();
    const { codigo } = useLocalSearchParams();

    const alias = restaurantAliases[codigo as string];
    const restaurant = restaurantsData[alias];

    const navigateToGestion = () => {
        router.push(`/admin/restaurantesAdmin/${codigo}`);
    };

    const navigateToResenas = () => {
        router.push(`/admin/restaurantesAdmin/resenias/${codigo}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {restaurant?.logo && (
                    <Image
                        source={restaurant.logo}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            borderWidth: 1.8,
                            borderColor: '#000',
                        }}
                    />
                )}
            </View>
            <Text style={styles.title}>GESTIONAR</Text>
            <Text style={styles.title}>NEGOCIO</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={navigateToGestion}>
                    <Text style={styles.buttonText}>Gestionar Carta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={navigateToResenas}>
                    <Text style={styles.buttonText}>Ver Reseñas</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 20
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    title: {
        fontSize: 32,
        fontFamily: 'Playfair',
        color: '#000',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: '#6c1f2c',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        margin: 11,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16.5,
        textAlign: 'center'
    },
});