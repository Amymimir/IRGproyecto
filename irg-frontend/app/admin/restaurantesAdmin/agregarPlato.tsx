import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, Plus } from 'lucide-react-native'
import { useState } from 'react'
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { useRestaurantes } from '../../../contexts/RestoContext'
import { restaurantAliases } from '../../../constants/data'

const categorias = ['Entrantes', 'Primeros', 'Segundos', 'Postres', 'Bebidas']
const opcionesSub = ['Frio', 'Caliente']

export default function AgregarPlato() {
    const { codigo } = useLocalSearchParams()
    const router = useRouter()
    const alias = restaurantAliases[codigo as string]
    const { restaurantes, agregarPlato } = useRestaurantes()

    if (!alias || !restaurantes || Object.keys(restaurantes).length === 0 || !restaurantes[alias]) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2ebdd' }}>
                <Text style={{ color: '#6c1f2c', fontSize: 16, fontFamily: 'Playfair' }}>
                    Restaurante no encontrado.
                </Text>
            </View>
        )
    }

    const platosExistentes = restaurantes[alias].platos

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')

    const handleAdd = () => {
        if (!name.trim() || !description.trim() || !category.trim() || !subCategory.trim()) {
            Alert.alert('Faltan datos', 'Completá todos los campos obligatorios.')
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

        agregarPlato(alias, {
            name,
            description,
            image: require('../../../assets/images/logo.png'),
            category,
            subCategory
        })

        Alert.alert('Plato agregado', 'El plato fue agregado exitosamente.', [
            { text: 'OK', onPress: () => router.back() }
        ])
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={30} color="#000" />
                </TouchableOpacity>
            </View>
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

                <Text style={styles.label}>Categoría Principal</Text>
                <View style={styles.dropdownCentered}>
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

                <Text style={styles.label}>Categoría Secundaria</Text>
                <View style={styles.dropdownWrapper}>
                    {opcionesSub.map((sub) => (
                        <TouchableOpacity
                            key={sub}
                            style={[
                                styles.categoryButton,
                                subCategory === sub && styles.categoryButtonSelected
                            ]}
                            onPress={() => setSubCategory(sub)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    subCategory === sub && styles.categoryTextSelected
                                ]}
                            >
                                {sub}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Plus size={18} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.buttonText}>Agregar Plato</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f2ebdd'
    },
    container: {
        flexGrow: 1,
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
    dropdownCentered: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
    },
    headerWrapper: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#f2ebdd',
        zIndex: 30
    },
    backButton: {
        padding: 4,
        marginBottom: 0,
        alignSelf: 'flex-start'
    }
})