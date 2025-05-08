import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native';
import Header from '../components/Header';
import Ranking from '../components/Ranking';
import MenuCard from '../components/MenuCard';

export default function LandingPageResto() {
  return (
    <ScrollView style={styles.container}>
      <Header restaurantName="Astor" />

      <View style={styles.header}>
        <Text style={styles.label}>requier</Text>
        <TextInput placeholder="Buscar en la carta..." style={styles.searchInput} />
      </View>

      <Text style={styles.sectionTitle}>~ RANKING ~</Text>
      <View style={styles.barChart}>
        {[4.8, 4.6, 4.3, 4.1, 4.0].map((score, i) => (
          <Ranking key={i} score={score} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>~ Nuestra carta ~</Text>
      <View style={styles.menu}>
        {[
          'Entradas',
          'Platos principales',
          'Postres',
          'Bebidas',
          'Vinos',
          'Especialidades',
        ].map((item, index) => (
          <MenuCard key={index} title={item} onPress={() => { }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2ebdd',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontFamily: 'Playfair',
    color: '#6c1f2c',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
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
  barChart: {
    marginVertical: 10,
  },
  menu: {
    marginTop: 10,
  },
});