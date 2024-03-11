import React from 'react';

import { Container as Cont } from './styles';
import Header from '../../components/Header';

const Stock: React.FC = () => {
  return (
    <Cont>
      <Header title="Custo do Pós-Vendas" />

      <div id="pivot">
        <iframe
          title="Dashboard Fluxo de Caixa"
          width="1280"
          height="768"
          src={process.env.REACT_APP_AFTERSALES_PB_LINK}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Stock;
