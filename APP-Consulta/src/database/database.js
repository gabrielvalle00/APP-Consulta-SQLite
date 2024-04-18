import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Consulta.db');

export const initDatabase = () => {
  db.transaction(tx => {
    //clientes
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_cliente TEXT, genero TEXT, data_nasc DATE);'
    );

    // telefones 
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS telefones (id INTEGER PRIMARY KEY AUTOINCREMENT, numero TEXT, tipo TEXT);'
    );

    // telefones_has_clientes 
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS telefones_has_clientes (' +
        'cliente_id INTEGER NOT NULL,' +
        'telefone_id INTEGER NOT NULL,' +
        'FOREIGN KEY (cliente_id) REFERENCES clientes(id),' +
        'FOREIGN KEY (telefone_id) REFERENCES telefones(id),' +
        'PRIMARY KEY (cliente_id, telefone_id)' +
        ');'
    );
  });
};


export const inserirClienteTelefone = (nome_cliente, genero, data_nasc, numero, tipo) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        
        tx.executeSql(
          'INSERT INTO clientes (nome_cliente, genero, data_nasc) VALUES (?, ?, ?)',
          [nome_cliente, genero, data_nasc],
          (_, { insertId: clienteId }) => {
            
            tx.executeSql(
              'INSERT INTO telefones (numero, tipo) VALUES (?, ?)',
              [numero, tipo],
              (_, { insertId: telefoneId }) => {
              
                tx.executeSql(
                  'INSERT INTO telefones_has_clientes (cliente_id, telefone_id) VALUES (?, ?)',
                  [clienteId, telefoneId],
                  (_, { rowsAffected }) => {
                    if (rowsAffected > 0) {
                      resolve({ clienteId, telefoneId });
                    } else {
                      reject(new Error('Nenhum cliente ou telefone inserido.'));
                    }
                  },
                  (_, error) => reject(error)
                );
              },
              (_, error) => reject(error)
            );
          },
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};

export const buscarClientesTelefones = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT clientes.id AS cliente_id, clientes.nome_cliente, clientes.genero, clientes.data_nasc, telefones.id AS telefone_id, telefones.numero, telefones.tipo FROM clientes JOIN telefones_has_clientes ON clientes.id = telefones_has_clientes.cliente_id JOIN telefones ON telefones_has_clientes.telefone_id = telefones.id;',
          [],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};



export const atualizarClienteTelefone = (cliente_id, novo_nome_cliente, novo_genero, novo_data_nasc, telefone_id, novo_numero, novo_tipo) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        
        tx.executeSql(
          'UPDATE clientes SET nome_cliente = ?, genero = ?, data_nasc = ? WHERE id = ?',
          [novo_nome_cliente, novo_genero, novo_data_nasc, cliente_id],
          (_, { rowsAffected: rowsAffectedCliente }) => {
            if (rowsAffectedCliente > 0) {
              
              tx.executeSql(
                'UPDATE telefones SET numero = ?, tipo = ? WHERE id = ?',
                [novo_numero, novo_tipo, telefone_id],
                (_, { rowsAffected: rowsAffectedTelefone }) => {
                  if (rowsAffectedTelefone > 0) {
                    resolve('Cliente e telefone atualizados com sucesso.');
                  } else {
                    reject(new Error('Erro ao atualizar telefone.'));
                  }
                },
                (_, error) => reject(error)
              );
            } else {
              reject(new Error('Erro ao atualizar cliente.'));
            }
          },
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};

export const deletarClienteTelefone = (cliente_id, telefone_id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        
        tx.executeSql(
          'DELETE FROM telefones_has_clientes WHERE cliente_id = ? AND telefone_id = ?',
          [cliente_id, telefone_id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              
              tx.executeSql(
                'DELETE FROM clientes WHERE id = ?',
                [cliente_id],
                (_, { rowsAffected: rowsAffectedClientes }) => {
                  if (rowsAffectedClientes > 0) {
                    
                    tx.executeSql(
                      'DELETE FROM telefones WHERE id = ?',
                      [telefone_id],
                      (_, { rowsAffected: rowsAffectedTelefones }) => {
                        if (rowsAffectedTelefones > 0) {
                          resolve('Cliente e telefone deletados com sucesso.');
                        } else {
                          reject(new Error('Erro ao deletar telefone.'));
                        }
                      },
                      (_, error) => reject(error)
                    );
                  } else {
                    reject(new Error('Erro ao deletar cliente.'));
                  }
                },
                (_, error) => reject(error)
              );
            } else {
              reject(new Error('Erro ao deletar relação cliente-telefone.'));
            }
          },
          (_, error) => reject(error)
        );
      },
      error => reject(error)
    );
  });
};
