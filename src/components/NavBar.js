import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function NavBar({ activeTab, navigation, isLoggedIn }) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Index')}>
        <Ionicons name="grid-outline" size={24} color={activeTab === 'Index' ? COLORS.primary : COLORS.grayText} />
        <Text style={[styles.navText, activeTab === 'Index' && styles.navTextActive]}>Catálogo</Text>
      </TouchableOpacity>

      {isLoggedIn ? (
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Users')}>
          <Ionicons name="people-outline" size={24} color={activeTab === 'Users' ? COLORS.primary : COLORS.grayText} />
          <Text style={[styles.navText, activeTab === 'Users' && styles.navTextActive]}>Usuarios</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="person-outline" size={24} color={activeTab === 'Login' ? COLORS.primary : COLORS.grayText} />
          <Text style={[styles.navText, activeTab === 'Login' && styles.navTextActive]}>Ingresar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: 20, 
  },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 11, marginTop: 4, color: COLORS.grayText },
  navTextActive: { color: COLORS.primary, fontWeight: 'bold' },
});