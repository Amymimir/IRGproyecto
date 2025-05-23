import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Header from '../../../components/Header'
import Ranking from '../../../components/Ranking'
import Categorias from '../../../components/Categorias'
import { useRestaurantes } from '../../../contexts/RestoContext'
import { ArrowLeft } from 'lucide-react-native'
import { useState, useRef } from 'react'
import type { ScrollView as ScrollViewType } from 'react-native'
import MenuCardCliente from '../../../components/MenuCardCliente'

export default function RestauranteClientePage() {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const { restaurantes, votarPlato } = useRestaurantes()

    const restaurant = restaurantes[id as string]
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
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={30} color="#000" />
                </TouchableOpacity>
            </View>

            <ScrollView ref={scrollRef} contentContainerStyle={styles.container} stickyHeaderIndices={[3]}>
                <Header restaurantName={restaurant.name} codigo={id as string} />
                <Ranking topItems={restaurant.topItems} />

                <Text style={styles.sectionTitle}>~ Nuestra carta ~</Text>

                <View style={styles.stickyCategorias}>
                    <Categorias
                        categorias={categorias}
                        activa={categoriaSeleccionada}
                        setCategoria={handleCategoriaPress}
                    />
                </View>

                {categorias.map((cat, catIndex) => {
                    const platos = restaurant.platos.filter(p => p.category === cat)
                    return (
                        <View key={catIndex} onLayout={e => guardarPosicion(cat, e.nativeEvent.layout.y)}>
                            <Text style={styles.categoryTitle}>{cat}</Text>
                            {platos.map((item, index) => {
                                const globalIndex = restaurant.platos.findIndex(p => p.name === item.name)
                                return (
                                    <MenuCardCliente
                                        key={`${cat}-${index}`}
                                        title={item.name}
                                        description={item.description}
                                        image={item.image}
                                        index={globalIndex}
                                        score={item.score}
                                        category={cat} 
                                        onVote={(rating: number) => votarPlato(id as string, globalIndex, rating)}
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
