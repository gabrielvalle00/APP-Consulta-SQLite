import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initDatabase, buscarClientesTelefones, deletarClienteTelefone, atualizarClienteTelefone } from '../../database/database.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Detalhes from '../Detalhes/index.js';

export default function Home() {
    useEffect(() => {
        initDatabase();
        buscarClientesTelefones();
        deletarClienteTelefone();
        atualizarClienteTelefone()
    }, []);

    const navigation = useNavigation();

    function navigateToDetails() {
        navigation.navigate('Detalhes');
    }

    return (
        <SafeAreaView style={styles.container}>


            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>

                    <Image
                        source={require('../../assets/7632726.jpg')}
                        style={styles.home}
                    />


                    <TouchableOpacity onPress={() => navigateToDetails()} style={styles.input}>
                        <FontAwesome6 name="gear" size={44} color="#00CED1" />
                    </TouchableOpacity>

                </View>



            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 1,
    },
    header: {
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    home: {
        right: 65,
        width: 500,
        height: 300
    },
    input: {
        marginTop: 280,
        marginLeft:330
    }
});
