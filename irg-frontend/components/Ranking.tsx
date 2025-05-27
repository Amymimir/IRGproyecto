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
                                    <View style={[styles.barFill, { width: `${(item.score / 5) * 100}%` }]}>
                                        <Text style={styles.scoreInside}>{item.score.toFixed(1)}</Text>
                                    </View>
                                </View>
                                <View style={styles.starsContainer}>
                                    <Text style={styles.star}>⭐️</Text>
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
        marginBottom: 18,
    },
    barChart: {
        paddingHorizontal: 12,
    },
    barRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    rankPosition: {
        width: 28,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6c1f2c',
        textAlign: 'center',
        textShadowColor: '#000',
        marginRight: 7,
        textShadowOffset: { width: 0.5, height: 0.8 },
        textShadowRadius: 1,
    },
    barColumn: {
        flex: 1,
    },
    rankLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    barWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barBackground: {
        flex: 1,
        height: 26,
        backgroundColor: '#ddd',
        borderRadius: 8,
        borderColor: '#6c1f2c',
        borderWidth: 1.2,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#729c8c',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    scoreInside: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    starsContainer: {
        marginLeft: 10,
    },
    star: {
        fontSize: 16,
    },
});