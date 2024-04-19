import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#00CED1' }}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/836.jpg')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileText}>Gabriel Valle</Text>
                <Text style={styles.roleText}>Administrador</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    roleText: {
        marginTop: 5,
        fontSize: 14,
        opacity: 0.6,
    },
});
