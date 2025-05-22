import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Header from '../../../components/Header'
import Ranking from '../../../components/Ranking'
import MenuCard from '../../../components/MenuCard'
import Categorias from '../../../components/Categorias'
import { restaurantAliases } from '../../../constants/data'
import { useRestaurantes } from '../../../contexts/RestoContext'
import { ArrowLeft } from 'lucide-react-native'
import { useState, useRef } from 'react'
import type { ScrollView as ScrollViewType } from 'react-native'

export default function RestauranteAdminPage() {
    const { codigo } = useLocalSearchParams()
    const router = useRouter()
    const alias = restaurantAliases[codigo as string]
    const { restaurantes } = useRestaurantes()

    const restaurant = restaurantes[alias]
    const categorias = restaurant.menu

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categorias[0])
    const scrollRef = useRef<ScrollViewType>(null)
    const seccionesRef = useRef<Record<string, number>>({})

    const handleCategoriaPress = (cat: string) => {
        setCategoriaSeleccionada(cat)
        const y = seccionesRef.current[cat]
        if (scrollRef.current && y !== undefined) {
            scrollRef.current.scrollTo({ y, animated: true })
        }
    }

    const guardarPosicion = (categoria: string, y: number) => {
        seccionesRef.current[categoria] = y
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity onPress={() => router.replace('../')} style={styles.backButton}>
                    <ArrowLeft size={30} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.container}
                stickyHeaderIndices={[4]}
            >
                <Header restaurantName={restaurant.name} codigo={codigo as string} />

                <View style={styles.rankingWrapper}>
                    <Ranking topItems={restaurant.topItems} />
                </View>

                <Text style={styles.sectionTitle}>~ Gestión de Carta ~</Text>

                <View style={styles.addButtonWrapper}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() =>
                            router.push({
                                pathname: '/admin/restaurantesAdmin/agregarPlato',
                                params: { codigo },
                            })
                        }
                    >
                        <Text style={styles.addButtonText}>+ Agregar Nuevo Plato</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.stickyCategorias}>
                    <Categorias
                        categorias={categorias}
                        activa={categoriaSeleccionada}
                        setCategoria={handleCategoriaPress}
                    />
                </View>

                {categorias.map((cat, catIndex) => {
                    const platosFiltrados = restaurant.platos.filter(p => p.category === cat)

                    return (
                        <View
                            key={catIndex}
                            onLayout={e => guardarPosicion(cat, e.nativeEvent.layout.y)}
                        >
                            <Text style={styles.categoryTitle}>{cat}</Text>

                            {platosFiltrados.map((item) => {
                                const globalIndex = restaurant.platos.findIndex(p => p.name === item.name)

                                return (
                                    <MenuCard
                                        key={`${cat}-${item.name}`}
                                        title={item.name}
                                        description={item.description}
                                        image={item.image}
                                        onEdit={() =>
                                            router.push({
                                                pathname: '/admin/restaurantesAdmin/editarPlato',
                                                params: {
                                                    codigo,
                                                    index: String(globalIndex),
                                                },
                                            })
                                        }
                                    />
                                )
                            })}

                            <View style={styles.separator} />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f2ebdd',
    },
    container: {
        padding: 12,
        paddingTop: 0,
        paddingBottom: 90,
    },
    headerWrapper: {
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#f2ebdd',
        zIndex: 30,
    },
    backButton: {
        padding: 4,
        marginBottom: 0,
        alignSelf: 'flex-start',
    },
    rankingWrapper: {
        backgroundColor: '#f2ebdd',
        paddingVertical: 6,
    },
    sectionTitle: {
        backgroundColor: '#6c1f2c',
        color: '#fff',
        padding: 8,
        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Playfair',
        textAlign: 'center',
    },
    addButtonWrapper: {
        marginBottom: 10,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#6c1f2c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#fff',
        fontFamily: 'Playfair',
        fontSize: 16,
    },
    stickyCategorias: {
        backgroundColor: '#f2ebdd',
        paddingTop: 12,
        paddingBottom: 0,
        zIndex: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        marginBottom: 8,
        marginTop: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#6c1f2c',
        marginVertical: 16,
    },
})