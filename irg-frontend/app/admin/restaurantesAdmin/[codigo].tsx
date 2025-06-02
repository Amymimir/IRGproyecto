import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Header from '../../../components/Header'
import Ranking from '../../../components/Ranking'
import MenuCard from '../../../components/MenuCard'
import Categorias from '../../../components/Categorias'
import { restaurantAliases } from '../../../constants/data'
import { useRestaurantes } from '../../../contexts/RestoContext'
import { useState, useRef, useEffect } from 'react'
import { useCartaSearch } from '../../../contexts/SearchContext'
import type { ScrollView as ScrollViewType } from 'react-native'
import type { CategoriaConSub } from '../../../components/Categorias'

export default function RestauranteAdminPage() {
    const { codigo } = useLocalSearchParams()
    const router = useRouter()
    const alias = restaurantAliases[codigo as string]
    const { restaurantes } = useRestaurantes()
    const restaurant = restaurantes[alias]

    const categorias: CategoriaConSub[] = Array.from(
        new Set(restaurant.platos.map(p => `${p.category}-${p.subCategory}`))
    ).map(entry => {
        const [principal, secundaria] = entry.split('-')
        return { principal, secundaria }
    })

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categorias[0]?.principal || '')

    const scrollRef = useRef<ScrollViewType>(null)
    const seccionesRef = useRef<Record<string, number>>({})
    const platosRef = useRef<Record<string, number>>({})

    const { setNombresPlatos, setBuscarYScroll } = useCartaSearch()

    const handleCategoriaPress = (cat: string) => {
        setCategoriaSeleccionada(cat)
        const y = seccionesRef.current[cat]
        if (scrollRef.current && y !== undefined) {
            scrollRef.current.scrollTo({ y: y - 80, animated: true })
        }
    }

    const guardarPosicion = (categoria: string, y: number) => {
        seccionesRef.current[categoria] = y
    }

    const guardarPlatoPosicion = (name: string, y: number) => {
        platosRef.current[name.toLowerCase()] = y
    }

    const scrollAlPlato = (name: string) => {
        const y = platosRef.current[name.toLowerCase()]
        if (scrollRef.current && y !== undefined) {
            scrollRef.current.scrollTo({ y: y - 80, animated: true })
        }
    }

    useEffect(() => {
        const nombres = restaurant.platos.map(p => p.name)
        setNombresPlatos(nombres)
        setBuscarYScroll(() => scrollAlPlato)
    }, [restaurant.platos])

    const categoriasUnicas = [...new Set(restaurant.platos.map(p => p.category))]

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.container}
                stickyHeaderIndices={[0, 4]}
                keyboardShouldPersistTaps="handled"
            >
                <Header />

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

                {categoriasUnicas.map((cat) => {
                    const platos = restaurant.platos.filter(p => p.category === cat)

                    return (
                        <View
                            key={cat}
                            onLayout={e => guardarPosicion(cat, e.nativeEvent.layout.y)}
                        >
                            <Text style={styles.categoryTitle}>{cat}</Text>

                            {platos.map((item) => {
                                const globalIndex = restaurant.platos.findIndex(p => p.name === item.name)

                                return (
                                    <View
                                        key={`${cat}-${item.name}`}
                                        onLayout={e => guardarPlatoPosicion(item.name, e.nativeEvent.layout.y)}
                                    >
                                        <MenuCard
                                            title={item.name}
                                            description={item.description}
                                            image={item.image}
                                            subCategory={item.subCategory}
                                            category={item.category}
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
                                    </View>
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