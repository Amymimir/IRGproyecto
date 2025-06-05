import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { restaurantsData, restaurantAliases } from '../../../../constants/data';

const mockReviews = {
    astor2024: [
        {
            title: 'Excelente comida',
            description: 'Todo riquísimo, volveremos pronto.',
            date: '2024-05-01',
            p1_satisfaccion: 4,
            p2_satisfaccion: 5,
            p3_satisfaccion: 3,
            p4_satisfaccion: 4,
            p5_satisfaccion: 5,
            p1_texto: 'El sabor estuvo increíble.',
            p2_texto: 'La textura fue excelente.',
            p3_texto: 'Podría mejorar la presentación.',
            p4_texto: 'Buena combinación de ingredientes.',
            p5_texto: 'Definitivamente volvería a pedirlo.'
        },
        {
            title: 'Atención rápida',
            description: 'Muy buena atención al cliente.',
            date: '2024-04-28',
            p1_satisfaccion: 5,
            p2_satisfaccion: 4,
            p3_satisfaccion: 4,
            p4_satisfaccion: 5,
            p5_satisfaccion: 5,
            p1_texto: 'El servicio fue muy amable.',
            p2_texto: 'Buena temperatura de los platos.',
            p3_texto: 'Ambiente agradable.',
            p4_texto: 'Muy buen sabor.',
            p5_texto: 'Recomendaría este restaurante.'
        },
    ],
};

export default function VerResenasPage() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();

    const resolvedCodigo = restaurantAliases[codigo as string] || codigo;
    const restaurant = restaurantsData[resolvedCodigo as string];
    const restaurantName = restaurant?.name || codigo;

    const reviews = mockReviews[codigo as keyof typeof mockReviews] || [];

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

    const sortedReviews = reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => router.replace(`/admin/restaurantesAdmin/eleccionResto?codigo=${codigo}`)} style={styles.backButton}>
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Reseñas de {restaurantName}</Text>

            {sortedReviews.map((review, index) => (
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
