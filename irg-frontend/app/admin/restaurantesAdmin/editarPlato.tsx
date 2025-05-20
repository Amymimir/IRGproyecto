import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, TextInput, StyleSheet, Text, Button, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { restaurantAliases } from '../../../constants/data';
import { useRestaurantes } from '../../../contexts/RestoContext';

export default function EditarPlato() {
    const { codigo, index } = useLocalSearchParams();
    const router = useRouter();

    const alias = restaurantAliases[codigo as string];
    const { restaurantes, actualizarPlato, eliminarPlato } = useRestaurantes();

    const platoIndex = parseInt(index as string);
    const item = restaurantes[alias].platos[platoIndex];

    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [image, setImage] = useState(item.image);
    const [category, setCategory] = useState(item.category);

    const handleSave = () => {
        actualizarPlato(alias, platoIndex, { name, description, image, category });
        router.back();
    };

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Plato',
            '¿Estás seguro de que querés eliminar este plato?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        eliminarPlato(alias, platoIndex);
                        router.back();
                    }
                }
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre del Plato</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Descripción</Text>
            <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline />

            <Text style={styles.label}>Categoría</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />

            <Text style={styles.label}>URL de la Imagen</Text>
            <TextInput style={styles.input} value={image} onChangeText={setImage} />

            {image ? <Image source={{ uri: image }} style={styles.preview} /> : null}

            <Button title="Guardar Cambios" onPress={handleSave} />
            <View style={{ marginTop: 20 }}>
                <Button title="Eliminar Plato" color="#8B0000" onPress={handleDelete} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f2ebdd',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    preview: {
        height: 120,
        width: '100%',
        borderRadius: 10,
        marginTop: 12,
        marginBottom: 20,
    },
});