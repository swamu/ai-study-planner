import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const hasSupabase = isSupabaseConfigured();

  useEffect(() => {
    // Check if user chose guest mode
    const guestMode = localStorage.getItem('guest_mode');
    if (guestMode === 'true') {
      setIsGuest(true);
      setUser(null);
      setLoading(false);
      return;
    }

    if (!hasSupabase) {
      // No Supabase configured - check for local user
      const localUser = localStorage.getItem('local_user_email');
      if (localUser) {
        setUser({ email: localUser, id: 'local-user', isLocal: true });
      }
      setLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [hasSupabase]);

  const signUp = async (email, password) => {
    if (!hasSupabase) {
      setError('Supabase not configured');
      return { error: 'Supabase not configured' };
    }

    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      setError(error.message);
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    if (!hasSupabase) {
      // Local mode - just save email
      localStorage.setItem('local_user_email', email);
      setUser({ email, id: 'local-user' });
      return { data: { user: { email, id: 'local-user' } }, error: null };
    }

    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      setError(error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    if (!hasSupabase) {
      // Local mode
      localStorage.removeItem('local_user_email');
      setUser(null);
      return;
    }

    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem('guest_mode', 'true');
    setIsGuest(true);
    setUser(null);
  };

  const exitGuestMode = () => {
    localStorage.removeItem('guest_mode');
    setIsGuest(false);
  };

  const value = {
    user,
    loading,
    error,
    isGuest,
    signUp,
    signIn,
    signOut,
    continueAsGuest,
    exitGuestMode,
    hasSupabase,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

