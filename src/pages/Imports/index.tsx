import React from 'react';

import { Container as Cont } from './styles';
import Header from '../../components/Header';

const Imports: React.FC = () => {
  return (
    <Cont>
      <Header title="Importações" />

      <div id="pivot">
        <iframe
          title="Importações"
          width="1280"
          height="768"
          src={process.env.REACT_APP_IMPORTEXPORT_PB_LINK}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Imports;
