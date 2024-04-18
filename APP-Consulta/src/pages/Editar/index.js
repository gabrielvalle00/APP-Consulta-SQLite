import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { atualizarClienteTelefone } from '../../database/database';
import { useNavigation, useRoute } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

const AtualizarClienteTelefoneScreen = () => {
    const route = useRoute();
    const item = route.params;
    const navigation = useNavigation();

  const [clienteId, setClienteId] = useState('');
  const [novoNomeCliente, setNovoNomeCliente] = useState(item.nome_cliente);
  const [novoGenero, setNovoGenero] = useState(item.genero);
  const [novoDataNasc, setNovoDataNasc] = useState(item.data_nasc);
  const [novoNumero, setNovoNumero] = useState(item.numero);
  const [novoTipo, setNovoTipo] = useState(item.tipo);
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

  const handleDataNascChange = (event, selectedDate) => {
    const currentDate = selectedDate || novoDataNasc;
    setShowDatePicker(Platform.OS === 'ios'); // Mostrar o seletor de data apenas para iOS
    setNovoDataNasc(currentDate);
  };

  const handleAtualizarClienteTelefone = async () => {
    try {
      await atualizarClienteTelefone(clienteId, novoNomeCliente, novoGenero, novoDataNasc, telefoneId, novoNumero, novoTipo);
      Alert.alert('Sucesso', 'Cliente e telefone atualizados com sucesso.');
      // Limpar campos após a atualização
      setClienteId('');
      setNovoNomeCliente('');
      setNovoGenero('');
      setNovoDataNasc();
      setTelefoneId('');
      setNovoNumero('');
      setNovoTipo('');
    } catch (error) {
      console.error('Erro ao atualizar cliente e telefone:', error);
      Alert.alert('Erro', 'Falha ao atualizar cliente e telefone. Por favor, tente novamente.');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: animacaoCard }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Atualizar Cliente e Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="ID do Cliente"
          value={clienteId}
          onChangeText={setClienteId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Novo Nome do Cliente"
          value={novoNomeCliente}
          onChangeText={setNovoNomeCliente}
        />
        <TextInput
          style={styles.input}
          placeholder="Novo Gênero"
          value={novoGenero}
          onChangeText={setNovoGenero}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Data"
          value={novoGenero}
          onChangeText={setNovoDataNasc}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Novo Número de Telefone"
          value={novoNumero}
          onChangeText={setNovoNumero}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Novo Tipo"
          value={novoTipo}
          onChangeText={setNovoTipo}
        />
        <Animated.View style={[styles.buttonContainer, { opacity: animacaoBotao }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAtualizarClienteTelefone}
          >
            <Text style={styles.buttonText}>Atualizar Cliente e Telefone</Text>
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

export default AtualizarClienteTelefoneScreen;
