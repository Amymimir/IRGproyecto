import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type MenuCardProps = {
    title: string;
    onPress: () => void;
};

export default function MenuCard({ title, onPress }: MenuCardProps) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#6c1f2c',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        textAlign: 'center',
    },
});