import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

export default function SideMenu({ visible, onClose, navigation, isLoggedIn, handleLogout }) {
  
  const navigateTo = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.menuContainer}>
          
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menú</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={COLORS.dark} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Index')}>
            <Ionicons name="home-outline" size={22} color={COLORS.primary} />
            <Text style={styles.menuText}>Catálogo (Inicio)</Text>
          </TouchableOpacity>

          {!isLoggedIn ? (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Login')}>
                <Ionicons name="log-in-outline" size={22} color={COLORS.primary} />
                <Text style={styles.menuText}>Iniciar Sesión</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Register')}>
                <Ionicons name="person-add-outline" size={22} color={COLORS.primary} />
                <Text style={styles.menuText}>Registrarse</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Users')}>
                <Ionicons name="people-outline" size={22} color={COLORS.secondary} />
                <Text style={[styles.menuText, { color: COLORS.secondary }]}>Panel de Usuarios</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={() => { onClose(); handleLogout(); }}>
                <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
                <Text style={[styles.menuText, { color: COLORS.danger }]}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        {/* Área táctil para cerrar el menú al tocar el fondo oscuro */}
        <TouchableOpacity style={styles.closeArea} onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.4)' },
  menuContainer: {
    width: '70%',
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingHorizontal: 20,
  },
  closeArea: { flex: 1 },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  menuTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.dark },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuText: { fontSize: 16, marginLeft: 12, fontWeight: '500', color: COLORS.dark },
});