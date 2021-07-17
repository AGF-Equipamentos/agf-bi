import React from 'react';

import { Container as Cont } from './styles';
import Header from '../../components/Header';

const Productivity: React.FC = () => {
  return (
    <Cont>
      <Header title="Produtividade" />

      <div id="pivot">
        <iframe
          title="Produtividade"
          width="1280"
          height="768"
          src={process.env.REACT_APP_PRODUCTIVITY_PB_LINK}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Productivity;
