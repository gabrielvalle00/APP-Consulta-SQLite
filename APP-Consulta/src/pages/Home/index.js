import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initDatabase } from '../../database/database.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Title, Paragraph } from 'react-native-paper';

export default function Home() {
    useEffect(() => {
        initDatabase();
    }, []);

    const navigation = useNavigation();

    function navigateToDetails() {
        navigation.navigate('Detalhes');
    }

    return (
        <SafeAreaView style={styles.container}>


            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>depois eu arrumo ksksks</Text>
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
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    card: {
        width: 150,
        height: 250,
        backgroundColor: 'white',
        marginBottom: 10,
        marginRight: 10,
    },
});
