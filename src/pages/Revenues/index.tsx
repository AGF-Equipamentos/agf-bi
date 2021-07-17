import React from 'react';

import { Container as Cont } from './styles';
import Header from '../../components/Header';

const Revenues: React.FC = () => {
  return (
    <Cont>
      <Header title="Faturamento" />

      <div id="pivot">
        <iframe
          title="Faturamento"
          width="1280"
          height="768"
          src={process.env.REACT_APP_REVENUE_PB_LINK}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Revenues;
