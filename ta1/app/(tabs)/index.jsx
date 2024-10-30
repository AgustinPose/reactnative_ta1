import { StyleSheet, ScrollView, TextInput, Button, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function PantallaPrincipal() {
  const [tarea, setTarea] = useState('');
  const [listaTareas, setListaTareas] = useState([]);
  const [contador, setContador] = useState(0);
  const [screenSize, setScreenSize] = useState(Dimensions.get('window')); // Inicializa con las dimensiones actuales

  // useEffect para manejar cambios en las dimensiones de la pantalla
  useEffect(() => {
    const onChange = ({ window }) => {
      console.log("Hola");
      setScreenSize(window); // Actualiza el tamaño de pantalla en el estado
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    // Cleanup del listener al desmontar el componente
    return () => {
      subscription?.remove();
    };
  }, []);

  const agregarTarea = () => {
    if (tarea.trim()) {
      setListaTareas([...listaTareas, tarea]);
      setTarea('');
      setContador(contador + 1);
    }
  };

  const eliminarTarea = (indice) => {
    setListaTareas(listaTareas.filter((_, i) => i !== indice));
    setContador(contador - 1);
  };

  return (
    <ScrollView>
      <ThemedView style={estilos.contenedor(screenSize.width)}>
        <ThemedText style={estilos.titulo(screenSize.width, screenSize.height)}>To Do List</ThemedText>
        <ThemedText style={estilos.contadorEstilo(screenSize.width, screenSize.height)}>Cantidad Tareas: {contador}</ThemedText>
        
        <ThemedView style={estilos.contenedorEntrada(screenSize.height)}>
          <TextInput
            style={estilos.entrada}
            placeholder='Nueva Tarea'
            value={tarea}
            onChangeText={setTarea}
          />
          <Button title="Agregar" onPress={agregarTarea} />
        </ThemedView>
      </ThemedView>

      <ThemedView style={estilos.listaTareas}>
        {listaTareas.map((tarea, indice) => (
          <View key={indice} style={estilos.elementoTarea(screenSize.width)}>
            <ThemedText>{tarea}</ThemedText>
            <Button
              title="Eliminar"
              color="#FF3B30"
              onPress={() => eliminarTarea(indice)}
            />
          </View>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

// Estilos como funciones para usar screenSize
const estilos = {
  contenedor: (width) => ({
    padding: width * 0.05, // Aplica el 5% del ancho de la pantalla como padding
  }),
  titulo: (width, height) => ({
    fontSize: width * 0.06, // Tamaño de fuente relativo al ancho de pantalla
    fontWeight: 'bold',
    marginTop: height * 0.05, // Espacio en la parte superior relativo al alto de pantalla
    marginBottom: height * 0.02, // Espacio en la parte inferior
  }),
  contadorEstilo: (width, height) => ({
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  }),
  contenedorEntrada: (height) => ({
    flexDirection: 'row',
    marginBottom: height * 0.02,
  }),
  entrada: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  listaTareas: {
    gap: 10,
  },
  elementoTarea: (width) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    width: width * 0.9, // Usa el 90% del ancho de la pantalla para las tareas
  })
};
