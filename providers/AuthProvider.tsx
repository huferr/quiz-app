import React, { createContext, useState, useEffect, useMemo } from "react";
import { supabase } from "@/api";
import { Session } from "@supabase/supabase-js";

type ContextProps = {
  user: boolean | null;
  session: Session | null;
  loading: boolean;
};

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<Partial<ContextProps>>({});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<ContextProps["user"]>(null);
  const [session, setSession] = useState<ContextProps["session"]>(null);
  const [loading, setLoading] = useState(false);

  const sessionFetcher = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setUser(null);
        setSession(null);
        console.error("Supabase API | Auth Provider Error: ", error);
        return;
      }

      setSession(data.session);
      setUser(!!data?.session?.user);
    } catch (error) {
      console.error("Auth Provider Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthStateChange = async (event: string, sess: Session | null) => {
    console.log(`Supabase auth event: ${event}`);
    setSession(sess);
    setUser(sess?.user ? true : false);
  };

  useEffect(() => {
    sessionFetcher();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
    }),
    [user, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
