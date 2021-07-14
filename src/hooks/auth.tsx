import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { mutate } from 'swr';
import api from '../services/api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const isLogged = localStorage.getItem('@AGF-BI:logged');
      const fatMFs = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0510&ano=2019,%202020,%202021`,
      );
      const fatRomp = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0010&ano=2019,%202020,%202021`,
      );
      const fatGer = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0500&ano=2019,%202020,%202021`,
      );
      const fatOutros = localStorage.getItem(
        `@AGF-BI:fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020,%202021`,
      );
      const opCosts = localStorage.getItem(
        `@AGF-BI:op-costs?filial=0101&ano=2019,%202020,%202021`,
      );
      const margin = localStorage.getItem(
        `@AGF-BI:fat?filial=0101,0102&ano=2020,%202021&devolution=no`,
      );
      const breakers = localStorage.getItem(
        `@AGF-BI:pcs?filial=0101&grupo=0010&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
      );
      const breakersStock = localStorage.getItem(
        `@AGF-BI:estoques?filial=0101&grupo=0010&armazem=01,06`,
      );
      const plates = localStorage.getItem(
        `@AGF-BI:pcs?filial=0101&grupo=3050&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
      );
      const platesStock = localStorage.getItem(
        `@AGF-BI:estoques?filial=0101&grupo=3050&armazem=01,06`,
      );

      if (isLogged) {
        setLogged({ logged: JSON.parse(isLogged) });
      }

      if (fatMFs) {
        await mutate(
          'fat?filial=0101&grupo=0510&ano=2019,%202020,%202021',
          JSON.parse(fatMFs),
        );
      } else {
        const data = await api
          .get('fat?filial=0101&grupo=0510&ano=2019,%202020,%202021')
          .then(res => res.data);
        await mutate(
          'fat?filial=0101&grupo=0510&ano=2019,%202020,%202021',
          data,
        );
        localStorage.setItem(
          `@AGF-BI:fat?filial=0101&grupo=0510&ano=2019,%202020,%202021`,
          JSON.stringify(data),
        );
      }

      if (fatRomp) {
        await mutate(
          'fat?filial=0101&grupo=0010&ano=2019,%202020,%202021',
          JSON.parse(fatRomp),
        );
      } else {
        const data = await api
          .get('fat?filial=0101&grupo=0010&ano=2019,%202020,%202021')
          .then(res => res.data);
        await mutate(
          'fat?filial=0101&grupo=0010&ano=2019,%202020,%202021',
          data,
        );
        localStorage.setItem(
          `@AGF-BI:fat?filial=0101&grupo=0010&ano=2019,%202020,%202021`,
          JSON.stringify(data),
        );
      }

      if (fatGer) {
        await mutate(
          'fat?filial=0101&grupo=0500&ano=2019,%202020,%202021',
          JSON.parse(fatGer),
        );
      } else {
        const data = await api
          .get('fat?filial=0101&grupo=0500&ano=2019,%202020,%202021')
          .then(res => res.data);
        await mutate(
          'fat?filial=0101&grupo=0500&ano=2019,%202020,%202021',
          data,
        );
        localStorage.setItem(
          `@AGF-BI:fat?filial=0101&grupo=0500&ano=2019,%202020,%202021`,
          JSON.stringify(data),
        );
      }

      if (fatOutros) {
        await mutate(
          'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020,%202021',
          JSON.parse(fatOutros),
        );
      } else {
        const data = await api
          .get(
            'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020,%202021',
          )
          .then(res => res.data);
        await mutate(
          'fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020,%202021',
          data,
        );
        localStorage.setItem(
          `@AGF-BI:fat?filial=0101&grupo=0050,%200060,%200070,%200090,%200094,%200501,%200502,%200503,%200520,%200530,%200540,%200550,%200560,%200570&ano=2019,%202020,%202021`,
          JSON.stringify(data),
        );
      }

      if (opCosts) {
        await mutate(
          'op-costs?filial=0101&ano=2019,%202020,%202021',
          JSON.parse(opCosts),
        );
      } else {
        const data = await api
          .get('op-costs?filial=0101&ano=2019,%202020,%202021')
          .then(res => res.data);
        await mutate('op-costs?filial=0101&ano=2019,%202020,%202021', data);
        localStorage.setItem(
          `@AGF-BI:op-costs?filial=0101&ano=2019,%202020,%202021`,
          JSON.stringify(data),
        );
      }

      if (margin) {
        await mutate(
          'fat?filial=0101,0102&ano=2020,%202021&devolution=no',
          JSON.parse(margin),
        );
      } else {
        const data = await api
          .get('fat?filial=0101,0102&ano=2020,%202021&devolution=no')
          .then(res => res.data);
        await mutate(
          'fat?filial=0101,0102&ano=2020,%202021&devolution=no',
          data,
        );
        localStorage.setItem(
          `@AGF-BI:fat?filial=0101,0102&ano=2020,%202021&devolution=no`,
          JSON.stringify(data),
        );
      }

      if (breakers) {
        await mutate(
          `pcs?filial=0101&grupo=0010&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          JSON.parse(breakers),
        );
      } else {
        const data = await api
          .get(
            `pcs?filial=0101&grupo=0010&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          )
          .then(res => res.data);
        await mutate(
          `pcs?filial=0101&grupo=0010&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          data,
        );
        localStorage.setItem(
          `@AGF-BI:pcs?filial=0101&grupo=0010&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          JSON.stringify(data),
        );
      }

      if (breakersStock) {
        await mutate(
          'estoques?filial=0101&grupo=0010&armazem=01,06',
          JSON.parse(breakersStock),
        );
      } else {
        const data = await api
          .get('estoques?filial=0101&grupo=0010&armazem=01,06')
          .then(res => res.data);
        await mutate('estoques?filial=0101&grupo=0010&armazem=01,06', data);
        localStorage.setItem(
          `@AGF-BI:estoques?filial=0101&grupo=0010&armazem=01,06`,
          JSON.stringify(data),
        );
      }

      if (plates) {
        await mutate(
          `pcs?filial=0101&grupo=3050&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          JSON.parse(plates),
        );
      } else {
        const data = await api
          .get(
            `pcs?filial=0101&grupo=3050&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          )
          .then(res => res.data);
        await mutate(
          `pcs?filial=0101&grupo=3050&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          data,
        );
        localStorage.setItem(
          `@AGF-BI:pcs?filial=0101&grupo=3050&legenda=PENDENTE','ATENDIDO%20PARCIALMENTE`,
          JSON.stringify(data),
        );
      }

      if (platesStock) {
        await mutate(
          'estoques?filial=0101&grupo=3050&armazem=01,06',
          JSON.parse(platesStock),
        );
      } else {
        const data = await api
          .get('estoques?filial=0101&grupo=3050&armazem=01,06')
          .then(res => res.data);
        await mutate('estoques?filial=0101&grupo=3050&armazem=01,06', data);
        localStorage.setItem(
          `@AGF-BI:estoques?filial=0101&grupo=3050&armazem=01,06`,
          JSON.stringify(data),
        );
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

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
