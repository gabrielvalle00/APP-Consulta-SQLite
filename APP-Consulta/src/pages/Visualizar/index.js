import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { buscarClientesTelefones, deletarClienteTelefone, atualizarClienteTelefone } from '../../database/database';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const windowWidth = Dimensions.get('window').width;

const VisualizarClientesTelefonesScreen = ({ navigation }) => {
  const [clientesTelefones, setClientesTelefones] = useState([]);
  const [animacao] = useState(new Animated.Value(0));

  const buscarClientesTelefonesDB = async () => {
    try {
      const resultadoBusca = await buscarClientesTelefones();
      setClientesTelefones(resultadoBusca.rows._array);
    } catch (error) {
      console.error('Erro ao buscar clientes e telefones:', error);
    }
  };

  const Editar = (cliente) => {
    navigation.navigate('Editar', cliente);
  };

  const handleExcluir = async (id) => {
    Alert.alert(
      'Excluir Cliente',
      'Tem certeza de que deseja excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              // Encontrar o cliente e telefone associados ao ID do item
              const itemExcluir = clientesTelefones.find(item => item.id === id);
              const cliente_id = itemExcluir.cliente_id;
              const telefone_id = itemExcluir.telefone_id;

              // Excluir o cliente e telefone
              await deletarClienteTelefone(cliente_id, telefone_id);

              // Atualizar a lista de clientes e telefones
              buscarClientesTelefonesDB();
            } catch (error) {
              console.error('Erro ao excluir cliente:', error);
              Alert.alert('Erro', 'Falha ao excluir cliente. Por favor, tente novamente.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    buscarClientesTelefonesDB();
  }, []);

  const fadeIn = () => {
    Animated.timing(animacao, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  fadeIn();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Clientes e Telefones</Text>
      <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.cliente_id}</Text>
        <Text style={styles.itemText}>Nome: {item.nome_cliente}</Text>
        <Text style={styles.itemText}>Gênero: {item.genero}</Text>
        <Text style={styles.itemText}>Data de Nascimento: {item.data_nasc}</Text>
        <Text style={styles.itemText}>{item.tipo}: {item.numero} </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => Editar(item)} style={styles.button}>
            <FontAwesome6 name="pencil" size={24} color="lightgreen" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleExcluir(item.id)} style={styles.button}>
            <FontAwesome6 name="trash-alt" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clientesTelefones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8f8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    marginTop:20,
    width: windowWidth * 0.9,
    elevation: 3,
    shadowColor: '#00CED1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00CED1',
  },
  itemContainer: {
    marginBottom: 20,
  },
  itemText: {
    color: '#00CED1',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    
  },
});

export default VisualizarClientesTelefonesScreen;
