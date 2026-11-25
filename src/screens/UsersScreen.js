import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';
import { COLORS } from '../theme/colors';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SideMenu from '../components/SideMenu';
import { useAuth } from '../context/AuthContext';

export default function UsersScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  
  const { isLoggedIn, handleLogout, user } = useAuth();

  // Efecto para proteger la ruta y cargar datos
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Index'); // Si no está logueado, lo expulsamos al catálogo
      return;
    }
    fetchUsuarios();
  }, [isLoggedIn]);

  const fetchUsuarios = async () => {
    const { data, error } = await supabase.from('perfiles').select('*');
    
    if (!error && data) {
      setUsuarios(data);
    } else {
      console.error('Error cargando usuarios:', error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onOpenMenu={() => setMenuVisible(true)} />
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Panel de Usuarios</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Privado</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Lista de miembros registrados en la plataforma.</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.nombre.charAt(0).toUpperCase()}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.nombre}</Text>
                  <Text style={styles.role}>Rol: {item.rol.toUpperCase()}</Text>
                  <Text style={styles.phone}>📞 {item.telefono || 'No registrado'}</Text>
                  
                  {/* Si el usuario logueado es el mismo de la tarjeta, mostramos su correo */}
                  {user && user.id === item.id && (
                    <Text style={styles.email}>✉️ {user.email}</Text>
                  )}
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No hay usuarios registrados aún.</Text>
            }
          />
        )}
      </View>

      <NavBar activeTab="Users" navigation={navigation} isLoggedIn={isLoggedIn} />
      <Footer />
      
      <SideMenu 
        visible={menuVisible} 
        onClose={() => setMenuVisible(false)} 
        navigation={navigation}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.dark },
  badge: { backgroundColor: COLORS.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: COLORS.grayText, marginBottom: 20, marginTop: 4 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: { color: COLORS.white, fontSize: 20, fontWeight: 'bold' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  role: { fontSize: 12, color: COLORS.secondary, fontWeight: 'bold', marginTop: 2 },
  phone: { fontSize: 13, color: COLORS.grayText, marginTop: 4 },
  email: { fontSize: 12, color: COLORS.primary, marginTop: 4, fontWeight: '500' }, // Estilo para el correo
  emptyText: { textAlign: 'center', marginTop: 30, color: COLORS.grayText },
});