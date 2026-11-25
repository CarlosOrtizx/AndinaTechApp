import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
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

// Diccionario de imágenes locales
// Si tus imágenes son .jpg, cambia la extensión en cada línea
const imagenesProductos = {
  '1': require('../../assets/img/img1.png'), 
  '2': require('../../assets/img/img2.png'),
  '3': require('../../assets/img/img3.png'),
  '4': require('../../assets/img/img4.png'),
  '5': require('../../assets/img/img5.png'),

};

export default function IndexScreen({ navigation }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  
  const { isLoggedIn, handleLogout } = useAuth();

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    // Consultamos los productos ordenados por ID
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('id', { ascending: true });
      
    if (!error && data) {
      setProductos(data);
    } else {
      console.error("Error cargando productos:", error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onOpenMenu={() => setMenuVisible(true)} />
      
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Catálogo de Productos</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={productos}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {/* Si el ID no coincide con ninguna imagen, usa la 1 por defecto para no fallar */}
                <Image 
                  source={imagenesProductos[item.id] || imagenesProductos['1']} 
                  style={styles.productImage} 
                  resizeMode="cover"
                />
                
                <View style={styles.info}>
                  <Text style={styles.name}>{item.nombre}</Text>
                  <Text style={styles.desc} numberOfLines={2}>{item.descripcion}</Text>
                  <Text style={styles.price}>${item.precio.toLocaleString('es-CO')}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* Barra inferior y Footer en el orden correcto */}
      <NavBar activeTab="Index" navigation={navigation} isLoggedIn={isLoggedIn} />
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
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.dark, marginBottom: 16 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', color: COLORS.dark },
  desc: { fontSize: 12, color: COLORS.grayText, marginVertical: 4 },
  price: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary },
});