import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { restaurantsData, restaurantAliases } from '../../../../constants/data';

export default function VerResenasPage() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();

    const resolvedCodigo = restaurantAliases[codigo as string] || codigo;
    const restaurant = restaurantsData[resolvedCodigo as string];
    const restaurantName = restaurant?.name || codigo;

    // Estado para almacenar las reseñas reales del backend
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function obtenerResenas() {
            try {
                const response = await fetch(`http://localhost:3000/resenas?restaurante_id=${codigo}`);
                const data = await response.json();
                setReviews(data); // Guardamos las reseñas reales en el estado
            } catch (error) {
                console.error("Error al obtener reseñas:", error);
            } finally {
                setLoading(false);
            }
        }

        obtenerResenas();
    }, [codigo]);

    if (loading) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>Cargando reseñas...</Text>
            </View>
        );
    }

    if (reviews.length === 0) {
        return (
            <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>No hay reseñas disponibles para {restaurantName}.</Text>
                <TouchableOpacity onPress={() => router.replace(`/admin/restaurantesAdmin/eleccionResto?codigo=${codigo}`)} style={styles.backButton}>
                    <Text style={styles.backText}>Volver</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const sortedReviews = reviews.sort(
        (a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.replace(`/admin/restaurantesAdmin/eleccionResto?codigo=${codigo}`)} style={styles.backButton}>
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Reseñas de {restaurantName}</Text>

            {sortedReviews.map((review: { title: string; description: string; date: string, p1_satisfaccion: number, p2_satisfaccion: number, p3_satisfaccion: number, p4_satisfaccion: number, p5_satisfaccion: number, p1_texto: string, p2_texto: string, p3_texto: string, p4_texto: string, p5_texto: string }, index: number) => (
                <View key={index} style={styles.reviewCard}>
                    <Text style={styles.reviewTitle}>{review.title}</Text>
                    <Text style={styles.reviewDescription}>{review.description}</Text>
                    <Text style={styles.reviewDate}>Fecha: {review.date}</Text>

                    {/* Sección de satisfacción */}
                    <View style={styles.satisfactionContainer}>
                        <Text style={styles.sectionTitle}>Nivel de Satisfacción</Text>
                        <Text>P1: ¿Cómo calificas el sabor? ({review.p1_satisfaccion}/5)</Text>
                        <Text>P2: ¿Qué opinas de la textura? ({review.p2_satisfaccion}/5)</Text>
                        <Text>P3: ¿Qué te pareció la presentación? ({review.p3_satisfaccion}/5)</Text>
                        <Text>P4: ¿Cómo estuvo el equilibrio de sabores? ({review.p4_satisfaccion}/5)</Text>
                        <Text>P5: ¿Lo volverías a pedir? ({review.p5_satisfaccion}/5)</Text>
                    </View>

                    {/* Sección de comentarios */}
                    <View style={styles.commentsContainer}>
                        <Text style={styles.sectionTitle}>Opiniones del Cliente</Text>
                        <View style={styles.commentBox}><Text>{review.p1_texto}</Text></View>
                        <View style={styles.commentBox}><Text>{review.p2_texto}</Text></View>
                        <View style={styles.commentBox}><Text>{review.p3_texto}</Text></View>
                        <View style={styles.commentBox}><Text>{review.p4_texto}</Text></View>
                        <View style={styles.commentBox}><Text>{review.p5_texto}</Text></View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

// Estilos mejorados
const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#f2ebdd', flexGrow: 1 },
    backButton: { marginBottom: 16, backgroundColor: '#6c1f2c', padding: 8, borderRadius: 5 },
    backText: { color: '#fff', textAlign: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    reviewCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#ddd' },
    reviewTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    reviewDescription: { fontSize: 14, marginBottom: 4 },
    reviewDate: { fontSize: 12, color: '#555' },
    satisfactionContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    commentsContainer: {
        marginTop: 15,
        padding: 12,
        backgroundColor: '#fff5ea',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0b084',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4C1B26',
        marginBottom: 10,
    },
    commentBox: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    notFoundContainer: { flex: 1, backgroundColor: '#f2ebdd', justifyContent: 'center', alignItems: 'center', padding: 20 },
    notFoundText: { fontSize: 18, marginBottom: 12, color: '#6c1f2c' },
});