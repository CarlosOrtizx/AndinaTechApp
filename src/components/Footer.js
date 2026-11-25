import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/colors';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Andina Tech & Hogar</Text>
      <Text style={styles.version}>Desarrollado por el Equipo ©Carlos y Kevin 2026 - v1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { 
    backgroundColor: COLORS.dark, 
    paddingVertical: 7, 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  text: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
  version: { color: COLORS.grayText, fontSize: 10, marginTop: 4 },
});