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
      <Route path="/" exact component={SignIn} />
      <Route path="/menu" component={Menu} isPrivate />
      <Route path="/sales-mfs" component={SalesMFs} isPrivate />
      <Route path="/sales-romp" component={SalesRomp} isPrivate />
      <Route path="/sales-ger" component={SalesGer} isPrivate />
      <Route path="/sales-outros" component={SalesOutros} isPrivate />
      <Route path="/op-costs" component={OpCosts} isPrivate />
      <Route path="/margin" component={Margin} isPrivate />
      <Route path="/productivity" component={Productivity} isPrivate />
      <Route
        path="/productivityproduction"
        component={ProductivityProduction}
      />
      <Route path="/breakers" component={Breakers} isPrivate />
      <Route path="/plates" component={Plates} isPrivate />
      <Route path="/revenues" component={Revenues} isPrivate />
      <Route path="/imports" component={Imports} />
    </Switch>
  );
};

export default Routes;
