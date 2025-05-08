import { View, Text, StyleSheet } from 'react-native';

type RankingProps = {
    score: number;
};

export default function Ranking({ score }: RankingProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>~ RANKING ~</Text>
            <View style={styles.barChart}>
                <View style={styles.barRow}>
                    <Text>1</Text>
                    <View style={[styles.bar, { width: `${score * 20}%` }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        backgroundColor: '#f2ebdd',
    },
    title: {
        backgroundColor: '#6c1f2c',
        color: '#fff',
        padding: 8,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Playfair',
        textAlign: 'center',
    },
    barChart: {
        marginVertical: 10,
        paddingHorizontal: 8,
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    bar: {
        height: 10,
        backgroundColor: '#729c8c',
        marginLeft: 10,
        borderRadius: 4,
    },
});