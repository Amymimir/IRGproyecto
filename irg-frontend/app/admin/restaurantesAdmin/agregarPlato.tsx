import { useLocalSearchParams, useRouter } from 'expo-router'
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Alert,
    TouchableOpacity
} from 'react-native'
import { useState } from 'react'
import { restaurantAliases } from '../../../constants/data'
import { useRestaurantes } from '../../../contexts/RestoContext'
import { Plus } from 'lucide-react-native'

export default function AgregarPlato() {
    const { codigo } = useLocalSearchParams()
    const router = useRouter()
    const alias = restaurantAliases[codigo as string]
    const { restaurantes, agregarPlato } = useRestaurantes()

    const categorias = restaurantes[alias].menu
    const platosExistentes = restaurantes[alias].platos

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')

    const isValidImage = (img: any) => {
        return (
            typeof img === 'number' ||
            (typeof img === 'string' && img.trim().length > 0 && img.startsWith('http'))
        )
    }

    const handleAdd = () => {
        if (!name.trim() || !description.trim() || !category.trim() || !image.trim()) {
            Alert.alert('Faltan datos', 'Completá todos los campos obligatorios.')
            return
        }

        if (!categorias.includes(category)) {
            Alert.alert('Categoría inválida', 'Seleccioná una categoría válida.')
            return
        }

        const nombreNormalizado = name.trim().toLowerCase()
        const yaExiste = platosExistentes.some(
            p => p.name.trim().toLowerCase() === nombreNormalizado
        )

        if (yaExiste) {
            Alert.alert('Nombre duplicado', 'Ya existe un plato con ese nombre.')
            return
        }

        if (!isValidImage(image)) {
            Alert.alert('Imagen inválida', 'Debes ingresar una URL válida de imagen.')
            return
        }

        agregarPlato(alias, { name, description, image, category })
        Alert.alert('Plato agregado', 'El plato fue agregado exitosamente.', [
            { text: 'OK', onPress: () => router.back() }
        ])
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar Plato</Text>

            <Text style={styles.label}>Nombre del Plato</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => {
                    if (text.length <= 50) setName(text)
                }}
                maxLength={50}
                placeholder="Máx. 50 caracteres"
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={(text) => {
                    if (text.length <= 111) setDescription(text)
                }}
                maxLength={111}
                multiline
                placeholder="Máx. 111 caracteres"
            />

            <Text style={styles.label}>Categoría</Text>
            <View style={styles.dropdownWrapper}>
                {categorias.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        style={[
                            styles.categoryButton,
                            category === cat && styles.categoryButtonSelected
                        ]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                category === cat && styles.categoryTextSelected
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Imagen (URL)</Text>
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage}
                placeholder="Ej: https://..."
            />

            {image ? (
                <Image
                    source={typeof image === 'string' ? { uri: image } : image}
                    style={styles.preview}
                />
            ) : null}

            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Plus size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.buttonText}>Agregar Plato</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f2ebdd',
        alignItems: 'center',
        padding: 24
    },
    title: {
        fontSize: 26,
        fontFamily: 'Playfair',
        color: '#000',
        marginBottom: 20
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        marginTop: 12,
        marginBottom: 4
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top'
    },
    dropdownWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 4
    },
    categoryButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#6c1f2c',
        backgroundColor: '#fff',
        marginRight: 8,
        marginTop: 6
    },
    categoryButtonSelected: {
        backgroundColor: '#6c1f2c'
    },
    categoryText: {
        fontFamily: 'Playfair',
        color: '#6c1f2c'
    },
    categoryTextSelected: {
        color: '#fff'
    },
    preview: {
        height: 120,
        width: '100%',
        borderRadius: 10,
        marginTop: 12,
        marginBottom: 20
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#2e7d32',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    buttonText: {
        color: '#fff',
        fontSize: 16.5
    }
})