import React, { createContext, useCallback, useState, useContext } from 'react';

interface AuthState {
  logged: boolean;
}

interface SignInCredentials {
  password: string;
}

interface AuthContextData {
  logged: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(false);
  const signIn = useCallback(async ({ password }) => {
    if (password !== '!agf123#') {
      setLogged({ logged: false });
      throw Error('Senha incorreta');
    }

    localStorage.setItem('@AGF-BI:logged', JSON.stringify(true));

    setLogged({ logged: true });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AGF-BI:token');
    localStorage.removeItem('@AGF-BI:user');

    setLogged({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ logged: logged.logged, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
