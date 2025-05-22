import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Settings } from 'lucide-react-native';

type MenuCardProps = {
    title: string;
    description: string;
    image: string;
    onEdit: () => void;
};

export default function MenuCard({ title, description, image, onEdit }: MenuCardProps) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                <Settings size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
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
    description: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    iconButton: {
        backgroundColor: '#6c1f2c',
        padding: 8,
        borderRadius: 20,
    },
});
