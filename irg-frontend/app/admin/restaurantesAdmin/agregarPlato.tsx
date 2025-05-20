import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, TextInput, StyleSheet, Text, Button, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { restaurantAliases } from '../../../constants/data';
import { useRestaurantes } from '../../../contexts/RestoContext';

export default function AgregarPlato() {
    const { codigo } = useLocalSearchParams();
    const router = useRouter();
    const alias = restaurantAliases[codigo as string];
    const { restaurantes, agregarPlato } = useRestaurantes();

    const categorias = restaurantes[alias].menu;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const handleAdd = () => {
        if (!name || !description || !image || !category) {
            Alert.alert('Faltan datos', 'Completá todos los campos antes de continuar.');
            return;
        }

        if (!categorias.includes(category)) {
            Alert.alert('Categoría inválida', 'Elegí una categoría válida del restaurante.');
            return;
        }

        agregarPlato(alias, { name, description, image, category });
        router.back();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre del Plato</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Descripción</Text>
            <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline />

            <Text style={styles.label}>Categoría</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder={`Ej: ${categorias.join(', ')}`} />

            <Text style={styles.label}>URL de la Imagen</Text>
            <TextInput style={styles.input} value={image} onChangeText={setImage} />

            {image ? <Image source={{ uri: image }} style={styles.preview} /> : null}

            <Button title="Agregar Plato" onPress={handleAdd} />
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