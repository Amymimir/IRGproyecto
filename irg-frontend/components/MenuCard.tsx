import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Settings } from 'lucide-react-native'
import React from 'react'

type MenuCardProps = {
    title: string
    description: string
    image: any
    subCategory: string
    category: string
    onEdit: () => void
}

export default function MenuCard({ title, description, image, subCategory, onEdit }: MenuCardProps) {
    return (
        <View style={styles.card}>
            <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                <Settings size={20} color="#fff" />
            </TouchableOpacity>
        </View>
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
        marginLeft: 7,
        marginRight: 10,
        marginVertical: 5,
    },
    content: {
        flex: 1,
    },
    title: {
        color: '#6c1f2c',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    iconButton: {
        backgroundColor: '#6c1f2c',
        padding: 8,
        margin: 7,
        borderRadius: 20,
    },
})