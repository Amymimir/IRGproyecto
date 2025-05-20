import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Header from '../../../components/Header';
import Ranking from '../../../components/Ranking';
import MenuCard from '../../../components/MenuCard';
import { restaurantsData } from '../../../constants/data';
import { ArrowLeft } from 'lucide-react-native';

export default function RestauranteAdminPage() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();

    const restaurant = restaurantsData[codigo as string];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.replace('../')} style={styles.backButton}>
                <ArrowLeft size={30} color="#000" />
            </TouchableOpacity>

            <Header restaurantName={restaurant.name} codigo={codigo as string} />
            <Ranking topItems={restaurant.topItems} />

            <Text style={styles.sectionTitle}>~ Gestión de Carta ~</Text>
            {restaurant.menu.map((item, index) => (
                <MenuCard key={index} title={`Editar ${item}`} onPress={() => { }} />
            ))}
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
    backButton: {
        position: 'absolute',
        top: 17,
        left: 15,
        zIndex: 1,
        padding: 7,
    },
});