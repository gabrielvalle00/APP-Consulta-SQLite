import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { buscar} from '../../database/database';

const windowWidth = Dimensions.get('window').width;

const BuscaClienteTelefoneScreen = () => {
  const [termoBusca, setTermoBusca] = useState('');
  const [resultados, setResultados] = useState([]);
  const [animacao] = useState(new Animated.Value(0));

  const buscarClientesTelefonesDB = async () => {
    try {
      const resultadoBusca = await buscar(termoBusca);
      setResultados(resultadoBusca.rows._array);
    } catch (error) {
      console.error('Erro ao buscar clientes e telefones:', error);
    }
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const fadeIn = () => {
    Animated.timing(animacao, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.container, { opacity: animacao }]}>
      <View style={styles.card}>
        <Text style={styles.title}>Buscar Cliente ou Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nome, data de nascimento ou telefone"
          value={termoBusca}
          onChangeText={setTermoBusca}
        />
        <TouchableOpacity style={styles.button} onPress={buscarClientesTelefonesDB}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        {resultados.length === 0 ? (
          <Text style={styles.noResultsText}>Nenhum resultado encontrado ou termo de busca inválido.</Text>
        ) : (
          <FlatList
            data={resultados}
            keyExtractor={(item) => item.cliente_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultadoItem}>

                <Text style={styles.resultadoText}>ID: {item.cliente_id}</Text>           
                <Text style={styles.resultadoText}>Nome: {item.nome_cliente}</Text>
                <Text style={styles.resultadoText}>Data de Nascimento: {item.data_nasc}</Text>
                <Text style={styles.resultadoText}>{item.tipo}: {item.numero}</Text>

              </TouchableOpacity>
            )}
          />
        )}
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
    shadowColor: '#00CED1',
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
    color: '#00CED1',
  },
  input: {
    color:'black',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#00CED1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffff',
    fontSize: 16,
  },
  resultadoItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  resultadoText: {
    color:'black',
    fontSize: 16,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});

export default BuscaClienteTelefoneScreen;
