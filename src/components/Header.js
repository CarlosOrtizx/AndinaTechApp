import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function Header({ onOpenMenu }) {
  const { isLoggedIn, user, userName } = useAuth(); 
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  // Obtenemos la inicial del nombre (o del correo si aún no carga el nombre)
  const displayName = userName || user?.email?.split('@')[0] || 'U';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.menuBtn} onPress={onOpenMenu}>
          <Ionicons name="menu-outline" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.logo}>Andina Tech <Text style={styles.logoSpan}>& Hogar</Text></Text>
      </View>

      {/* Círculo del Avatar con punto verde */}
      {isLoggedIn && (
        <TouchableOpacity 
          style={styles.avatarContainer} 
          onPress={() => setProfileModalVisible(true)}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.onlineDot} />
        </TouchableOpacity>
      )}

      {/* Modal Flotante con el Perfil */}
      <Modal visible={profileModalVisible} transparent={true} animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setProfileModalVisible(false)}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitial}>{initial}</Text>
            </View>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            
            <TouchableOpacity 
              style={styles.closeModalBtn} 
              onPress={() => setProfileModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: { flexDirection: 'row', alignItems: 'center' },
  menuBtn: { marginRight: 12 },
  logo: { fontSize: 18, fontWeight: 'bold', color: COLORS.white },
  logoSpan: { color: COLORS.secondary },
  
  // Estilos del Avatar en el Header
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  // Estilos del Modal del Perfil
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start', // Aparece arriba
    alignItems: 'flex-end',       // Alineado a la derecha
    paddingTop: 70,
    paddingRight: 20,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInitial: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 12,
    color: COLORS.grayText,
    marginTop: 4,
    marginBottom: 16,
  },
  closeModalBtn: {
    backgroundColor: COLORS.background,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeModalText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});