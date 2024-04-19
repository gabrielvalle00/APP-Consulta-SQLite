import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalhesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Aplicativo</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome do Aplicativo:</Text>
        <Text style={styles.text}>MeuApp de Clientes e Telefones</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Versão do Aplicativo:</Text>
        <Text style={styles.text}>1.0.0</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.text}>
          Este é um aplicativo simples para gerenciar clientes e seus telefones. Você pode adicionar, editar, buscar e visualizar os clientes e seus detalhes.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00CED1',
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#00CED1',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default DetalhesScreen;
