import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, FlatList, Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

// Prefijos internacionales
const phonePrefixes = [
  { code: '+34', country: 'España' },
  { code: '+1', country: 'EEUU' },
  { code: '+44', country: 'Reino Unido' },
  { code: '+33', country: 'Francia' },
  { code: '+49', country: 'Alemania' },
  { code: '+52', country: 'México' },
  { code: '+57', country: 'Colombia' },
  { code: '+55', country: 'Brasil' },
  { code: '+351', country: 'Portugal' },
  { code: '+81', country: 'Japón' },
];

// Comunidades
const comunidades = [
  'Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias',
  'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña',
  'Comunidad Valenciana', 'Extremadura', 'Galicia', 'Madrid',
  'Murcia', 'Navarra', 'País Vasco', 'La Rioja', 'Ceuta', 'Melilla'
];

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    cluster: 'Madrid',
    terminos: false,
  });

  const [selectedPrefix, setSelectedPrefix] = useState('+34');
  const [showPrefixDropdown, setShowPrefixDropdown] = useState(false);

  const [selectedComunidad, setSelectedComunidad] = useState('Madrid');
  const [showComunidadDropdown, setShowComunidadDropdown] = useState(false);

  const isValid = () => {
    const { nombre, apellidos, telefono, terminos } = formData;

    if (!nombre.trim() || !apellidos.trim() || !telefono.trim()) {
      Alert.alert('Error', 'Por favor ingrese los datos solicitados.');
      return false;
    }

    if (nombre.trim().length <= 2) {
      Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres.');
      return false;
    }

    if (apellidos.trim().length <= 2) {
      Alert.alert('Error', 'El apellido debe tener al menos 3 caracteres.');
      return false;
    }

    if (!/^[0-9]{9}$/.test(telefono)) {
      Alert.alert('Error', `El teléfono debe tener 9 dígitos (sin el prefijo ${selectedPrefix}).`);
      return false;
    }

    if (!terminos) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (isValid()) {
      router.replace('/cliente/restoBuscador');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
        <ArrowLeft size={30} color="#000" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>REGÍSTRATE</Text>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Cata oculta</Text>
          <Text style={styles.counterNumber}>HOLAAAA</Text>
        </View>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca su nombre"
          value={formData.nombre}
          onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        />

        <Text style={styles.label}>Apellidos</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca sus apellidos"
          value={formData.apellidos}
          onChangeText={(text) => setFormData({ ...formData, apellidos: text })}
        />

        <Text style={styles.label}>Teléfono</Text>
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity
            onPress={() => setShowPrefixDropdown(!showPrefixDropdown)}
            style={styles.prefixSelector}
          >
            <Text style={styles.prefixText}>{selectedPrefix} ▼</Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="Número de teléfono"
            keyboardType="number-pad"
            maxLength={9}
            value={formData.telefono}
            onChangeText={(text) =>
              setFormData({ ...formData, telefono: text.replace(/[^0-9]/g, '') })}
          />
        </View>

        {showPrefixDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={phonePrefixes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.dropdownOption}
                  onPress={() => {
                    setSelectedPrefix(item.code);
                    setShowPrefixDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{`${item.code} - ${item.country}`}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        <Text style={styles.label}>Comunidad</Text>
        <TouchableOpacity
          onPress={() => setShowComunidadDropdown(!showComunidadDropdown)}
          style={styles.selectContainer}
        >
          <Text style={styles.selectText}>{selectedComunidad} ▼</Text>
        </TouchableOpacity>

        {showComunidadDropdown && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={comunidades}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.dropdownOption}
                  onPress={() => {
                    setSelectedComunidad(item);
                    setShowComunidadDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => setFormData({ ...formData, terminos: !formData.terminos })}
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: '#5C5C5C',
              borderRadius: 6,
              marginRight: 10,
              backgroundColor: formData.terminos ? '#007AFF' : '#FFF',
            }}
          />
          <Text style={styles.checkboxText}>
            BLA BLA BLA HE LEÍDO Y ACEPTADO LOS TÉRMINOS QUE NO SE QUE QUE NO SE CUANTOS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clusterButton} onPress={handleSubmit}>
          <Text style={styles.clusterButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5E9E2',
    padding: 20,
  },

  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 32,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 20,
    color: '#000',
  },

  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: '#171717',
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  prefix: {
    marginRight: 8,
    fontSize: 16,
    color: '#5C5C5C',
    fontFamily: 'Inter_600SemiBold',
  },

  phoneInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  clusterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  clusterText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#000',
  },

  clusterButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  clusterButtonText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },

  checkboxText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#5C5C5C',
  },

  counterContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c1f2c',
    fontFamily: 'Playfair',
    marginBottom: 4,
  },

  counterNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#729c8c',
    fontFamily: 'Playfair',
  },

  backButton: {
    position: 'absolute',
    top: 17,
    left: 15,
    zIndex: 1,
    padding: 7
  },

  formContainer: {
    justifyContent: 'center',
    marginHorizontal: 60,
    marginVertical: 50,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#FFF',
    width: '80%',
    maxHeight: '60%',
    borderRadius: 12,
    padding: 20,
  },

  prefixOption: {
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

  prefixText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  prefixSelector: {
    height: 48,
    minWidth: 60,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  selectContainer: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  selectText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter_400Regular',
  },

  dropdownContainer: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  dropdownList: {
    paddingVertical: 4,
  },

  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  dropdownText: {
    fontSize: 16,
    color: '#000',
  },


});