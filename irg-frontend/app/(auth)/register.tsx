import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { styles } from '../../constants/style';
import { router } from 'expo-router';

export default function RegisterScreen() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    cluster: 'Madrid',
    terminos: false
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>REGISTRATE</Text>

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
        <Text style={styles.prefix}>+34</Text>
        <TextInput
          style={[styles.input, styles.phoneInput]}
          placeholder="número de telefono"
          keyboardType="phone-pad"
          value={formData.telefono}
          onChangeText={(text) => setFormData({ ...formData, telefono: text })}
        />
      </View>

      <Text style={styles.label}>Comunidad</Text>
      <View style={styles.clusterContainer}>
        <Text style={styles.clusterText}>Madrid</Text>
        <TouchableOpacity style={styles.clusterButton}>
          <Text style={styles.clusterButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

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
            backgroundColor: '#FFF',
            marginRight: 10,
            backgroundColor: formData.terminos ? '#007AFF' : '#FFF'
          }}
        />
        <Text style={styles.checkboxText}>
          BLA BLA BLA HE LEÍDO Y ACEPTADO LOS TÉRMINOS
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
