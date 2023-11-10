import React from 'react';
import { Switch } from 'react-router-dom';

import styled from 'styled-components';
import Route from './Route';

import SignIn from '../pages/SignIn';

import { useAuth } from '../hooks/auth';
import SalesMFs from '../pages/SalesMFs';
import SalesRomp from '../pages/SalesRomp';
import SalesGer from '../pages/SalesGer';
import SalesOutros from '../pages/SalesOutros';
import OpCosts from '../pages/OpCosts';
import Margin from '../pages/Margin';
import Breakers from '../pages/Breakers';
import Plates from '../pages/Plates';
import Menu from '../pages/Menu';
import Productivity from '../pages/Productivity';
import ProductivityProduction from '../pages/ProductivityProduction';
import Revenues from '../pages/Revenues';
import Imports from '../pages/Imports';
import SalesCompressors from '../pages/SalesCompressors';
import SalesPolitriz from '../pages/SalesPolitriz';
import Stocks from '../pages/Stocks';
import AccumulatedByState from '../pages/AccumulatedByState';
import AccumulatedBySeller from '../pages/AccumulatedBySeller';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  border: 4px solid ${props => props.theme.colors.text}; /* Light grey */
  border-top: 4px solid ${props => props.theme.colors.primary}; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Routes: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Container>
        <h1 style={{ marginBottom: 16 }}>Carregando...</h1>
        <Loader />
      </Container>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={SignIn} title="Login | AGF Bi" />
      <Route path="/menu" component={Menu} isPrivate />
      <Route
        path="/sales-politrizes"
        component={SalesPolitriz}
        title="Vendas - Politriz | AGF Bi"
        isPrivate
      />
      <Route
        path="/sales-compressors"
        component={SalesCompressors}
        title="Vendas - Compressores | AGF Bi"
        isPrivate
      />
      <Route
        path="/sales-mfs"
        component={SalesMFs}
        title="Vendas - Máquinas à fio | AGF Bi"
        isPrivate
      />
      <Route
        path="/sales-romp"
        component={SalesRomp}
        title="Vendas - Rompedores | AGF Bi"
        isPrivate
      />
      <Route
        path="/sales-ger"
        component={SalesGer}
        title="Vendas - Geradores | AGF Bi"
        isPrivate
      />
      <Route
        path="/sales-outros"
        component={SalesOutros}
        title="Vendas - Outros | AGF Bi"
        isPrivate
      />
      <Route
        path="/op-costs"
        component={OpCosts}
        title="Custo de Fabricação | AGF Bi"
        isPrivate
      />
      <Route
        path="/margin"
        component={Margin}
        title="Margem dos Produtos | AGF Bi"
        isPrivate
      />
      <Route
        path="/productivity"
        component={Productivity}
        title="Produtividade | AGF Bi"
        isPrivate
      />
      <Route
        path="/productivityproduction"
        component={ProductivityProduction}
        title="Produtividade Produção | AGF Bi"
      />
      <Route
        path="/breakers"
        component={Breakers}
        title="Ordens Rompedores | AGF Bi"
        isPrivate
      />
      <Route
        path="/plates"
        component={Plates}
        title="PCs Chapas | AGF Bi"
        isPrivate
      />
      <Route
        path="/revenues"
        component={Revenues}
        title="Faturamento | AGF Bi"
        isPrivate
      />
      <Route
        path="/fat-state"
        component={AccumulatedByState}
        title="Acumulado 12 meses por Estado | AGF Bi"
        isPrivate
      />
      <Route
        path="/fat-seller"
        component={AccumulatedBySeller}
        title="Acumulado 12 meses por Vendedor | AGF Bi"
        isPrivate
      />
      <Route path="/stock" component={Stocks} title="Estoque | AGF Bi" />

      <Route path="/imports" component={Imports} title="Importações | AGF Bi" />
    </Switch>
  );
};

export default Routes;
