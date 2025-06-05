import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  ScrollView, Pressable
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

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
    if (nombre.trim().length <= 2 || apellidos.trim().length <= 2) {
      Alert.alert('Error', 'El nombre y apellido deben tener al menos 3 caracteres.');
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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
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
          <ScrollView style={styles.dropdownContainer}>
            {phonePrefixes.map(item => (
              <Pressable
                key={item.code}
                style={styles.dropdownOption}
                onPress={() => {
                  setSelectedPrefix(item.code);
                  setShowPrefixDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{`${item.code} - ${item.country}`}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}

        <Text style={styles.label}>Comunidad</Text>
        <TouchableOpacity
          onPress={() => setShowComunidadDropdown(!showComunidadDropdown)}
          style={styles.selectContainer}
        >
          <Text style={styles.selectText}>{selectedComunidad} ▼</Text>
        </TouchableOpacity>

        {showComunidadDropdown && (
          <ScrollView style={styles.dropdownContainer}>
            {comunidades.map(item => (
              <Pressable
                key={item}
                style={styles.dropdownOption}
                onPress={() => {
                  setSelectedComunidad(item);
                  setShowComunidadDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={() => setFormData({ ...formData, terminos: !formData.terminos })}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}
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
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  formContainer: {
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 14,
    left: 15,
    zIndex: 10,
  },
  title: {
    fontFamily: 'Playfair',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 2,
    color: '#000',
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#171717',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter',
    marginBottom: 8,
    elevation: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    height: 48,
  },
  prefixSelector: {
    height: 48,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 8,
    elevation: 1,
  },
  prefixText: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#000',
  },
  selectContainer: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 1,
  },
  selectText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter',
  },
  dropdownContainer: {
    maxHeight: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
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
  checkboxText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#5C5C5C',
    flex: 1,
    flexWrap: 'wrap',
  },
  clusterButton: {
    backgroundColor: '#8B1E3F',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  clusterButtonText: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 15,
  },
  counterContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  counterText: {
    fontSize: 16,
    color: '#6c1f2c',
    fontFamily: 'Playfair',
    marginBottom: 4,
  },
  counterNumber: {
    fontSize: 26,
    color: '#729c8c',
    fontFamily: 'Playfair',
  },
});