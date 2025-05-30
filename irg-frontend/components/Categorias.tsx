import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export type CategoriaConSub = {
    principal: string
    secundaria: string
}

type CategoriasProps = {
    categorias: CategoriaConSub[]
    activa: string
    setCategoria: (categoria: string) => void
}

export default function Categorias({ categorias, activa, setCategoria }: CategoriasProps) {
    const unicasPrincipales = Array.from(new Set(categorias.map(cat => cat.principal)))

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#f2ebdd', 'transparent']} style={styles.leftFade} />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
            >
                {unicasPrincipales.map((principal, index) => (
                    <TouchableOpacity
                        key={`${principal}-${index}`}
                        style={[styles.button, activa === principal && styles.activa]}
                        onPress={() => setCategoria(principal)}
                    >
                        <Text style={[styles.texto, activa === principal && styles.textoActivo]}>
                            {principal}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <LinearGradient colors={['transparent', '#f2ebdd']} style={styles.rightFade} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginBottom: 20
    },
    scroll: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    button: {
        backgroundColor: '#fff',
        borderColor: '#6c1f2c',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 7.5,
        paddingHorizontal: 12,
        marginHorizontal: 6
    },
    activa: {
        backgroundColor: '#6c1f2c'
    },
    texto: {
        color: '#6c1f2c',
        fontFamily: 'Playfair'
    },
    textoActivo: {
        color: '#fff'
    },
    leftFade: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        zIndex: 1
    },
    rightFade: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 5,
        zIndex: 1
    }
})