import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

export type MenuCardClienteProps = {
    title: string
    description: string
    image: any
    index: number
    score?: number
    category: string
    subCategory: string
    onVote?: (rating: number) => void
}

export default function MenuCardCliente({ title, description, image, index, score, category, subCategory }: MenuCardClienteProps) {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const handlePress = () => {
        if (!id || !category) return
        router.push({
            pathname: '/cliente/restaurantes/resenaCliente',
            params: {
                id: String(id),
                category,
                subCategory
            },
        })
    }

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {score !== undefined && (
                    <Text style={styles.score}>⭐ {score.toFixed(1)}</Text>
                )}
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#6c1f2c',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6c1f2c',
        fontFamily: 'Playfair',
    },
    score: {
        fontSize: 14,
        color: '#333',
        marginTop: 2,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
})