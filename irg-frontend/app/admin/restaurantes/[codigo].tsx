import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, StyleSheet, View, Button } from 'react-native';
import Header from '../../../components/Header';
import Ranking from '../../../components/Ranking';
import MenuCard from '../../../components/MenuCard';
import { restaurantsData } from '../../../constants/data';

export default function RestauranteAdminPage() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();

    const restaurant = restaurantsData[codigo as string];

    if (!restaurant) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Restaurante no encontrado</Text>
                <Button title="Volver a buscar" onPress={() => router.replace('/admin/eleccionResto')} />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header restaurantName={restaurant.name} />
            <Ranking score={restaurant.ranking} />

            <Text style={styles.sectionTitle}>~ Gestión de carta ~</Text>
            {restaurant.menu.map((item, index) => (
                <MenuCard key={index} title={`Editar ${item}`} onPress={() => { }} />
            ))}

            <Text style={styles.sectionTitle}>~ Ver reseñas ~</Text>
            <MenuCard title="Ver comentarios y calificaciones" onPress={() => { }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f2ebdd',
        flexGrow: 1,
    },
    sectionTitle: {
        backgroundColor: '#6c1f2c',
        color: '#fff',
        padding: 8,
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Playfair',
        textAlign: 'center',
    },
    notFoundContainer: {
        flex: 1,
        backgroundColor: '#f2ebdd',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    notFoundText: {
        fontSize: 18,
        marginBottom: 12,
        color: '#6c1f2c',
        fontFamily: 'Playfair',
    },
});
