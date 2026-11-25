import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(''); // <-- Nuevo estado para el nombre
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      // Si hay un usuario, buscamos su nombre en la tabla perfiles
      if (currentUser) {
        const { data } = await supabase
          .from('perfiles')
          .select('nombre')
          .eq('id', currentUser.id)
          .single();
        
        if (data) setUserName(data.nombre);
      } else {
        setUserName('');
      }
      
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, userName, isLoggedIn: !!user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}