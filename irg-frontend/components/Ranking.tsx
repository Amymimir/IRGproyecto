import { View, Text, StyleSheet } from 'react-native';

type TopItem = {
    name: string;
    score: number;
};

type RankingProps = {
    topItems: TopItem[];
};

export default function Ranking({ topItems }: RankingProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>~ RANKING ~</Text>
            <View style={styles.barChart}>
                {topItems.map((item, index) => (
                    <View key={index} style={styles.barRow}>
                        <Text style={styles.rankPosition}>{index + 1}</Text>
                        <View style={styles.barColumn}>
                            <Text style={styles.rankLabel}>{item.name}</Text>
                            <View style={styles.barWrapper}>
                                <View style={styles.barBackground}>
                                    <View style={[styles.barFill, { width: `${(item.score / 5) * 100}%` }]} />
                                </View>
                                <Text style={styles.scoreText}>{item.score.toFixed(1)}</Text>
                                <View style={styles.starsPlaceholder}>
                                    <Text>⭐️</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
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
        marginBottom: 3
    },
    barChart: {
        marginVertical: 10,
        paddingHorizontal: 8,
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 10,
    },
    rankPosition: {
        width: 30,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 2,
        marginRight: 5,
        textAlign: 'center',
        color: '#6c1f2c',
        textShadowColor: '#000',
        textShadowOffset: { width: 0.5, height: 0.8 },
        textShadowRadius: 1,
    },
    barColumn: {
        flex: 1,
        marginBottom: 2
    },
    rankLabel: {
        fontSize: 15,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    barWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barBackground: {
        height: 10.4,
        flex: 1,
        backgroundColor: '#ddd',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#6c1f2c',
        overflow: 'hidden',
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    barFill: {
        height: '100%',
        backgroundColor: '#729c8c',
    },
    scoreText: {
        width: 35,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    starsPlaceholder: {
        marginLeft: 5,
    },
});