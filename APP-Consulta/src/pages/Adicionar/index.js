import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { inserirClienteTelefone } from '../../database/database';

const windowWidth = Dimensions.get('window').width;

const InserirClienteTelefoneScreen = () => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [numeroTelefone, setNumeroTelefone] = useState('');
  const [tipoTelefone, setTipoTelefone] = useState('');
  const [animacaoCard] = useState(new Animated.Value(0));
  const [animacaoBotao] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(animacaoCard, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animacaoBotao, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        delay: 500,
      })
    ]).start();
  };

  fadeIn();

  const handleInserirClienteTelefone = async () => {
    try {
      await inserirClienteTelefone(nomeCliente, genero, dataNasc, numeroTelefone, tipoTelefone);
      Alert.alert('Sucesso', 'Cliente e telefone inseridos com sucesso.');
      // Limpar campos após a inserção
      setNomeCliente('');
      setGenero('');
      setDataNasc('');
      setNumeroTelefone('');
      setTipoTelefone('');
    } catch (error) {
      console.error('Erro ao inserir cliente e telefone:', error);
      Alert.alert('Erro', 'Falha ao inserir cliente e telefone. Por favor, tente novamente.');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: animacaoCard }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Inserir Cliente e Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Cliente"
          value={nomeCliente}
          onChangeText={setNomeCliente}
        />
        <TextInput
          style={styles.input}
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          value={dataNasc}
          onChangeText={setDataNasc}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Telefone"
          value={numeroTelefone}
          onChangeText={setNumeroTelefone}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Telefone"
          value={tipoTelefone}
          onChangeText={setTipoTelefone}
        />
        <Animated.View style={[styles.buttonContainer, { opacity: animacaoBotao }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleInserirClienteTelefone}
          >
            <Text style={styles.buttonText}>Inserir Cliente e Telefone</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: windowWidth * 0.9,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#778899', 
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#778899', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default InserirClienteTelefoneScreen;
