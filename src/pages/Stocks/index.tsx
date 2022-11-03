import React from 'react';

import { Container as Cont } from './styles';
import Header from '../../components/Header';

const Stock: React.FC = () => {
  return (
    <Cont>
      <Header title="Estoque" />

      <div id="pivot">
        <iframe
          title="Estoque"
          width="1280"
          height="768"
          src={process.env.REACT_APP_STOCKS_PB_LINK}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Stock;
