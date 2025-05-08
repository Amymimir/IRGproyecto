import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HeaderProps = {
    restaurantName: string;
};

export default function Header({ restaurantName }: HeaderProps) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
                <Text style={styles.name}>{restaurantName}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#f2ebdd',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f2ebdd',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 12,
    },
    name: {
        fontSize: 22,
        fontFamily: 'Playfair',
        color: '#6c1f2c',
        fontWeight: 'bold',
    },
});