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
          src="https://app.powerbi.com/view?r=eyJrIjoiZGYwNDRjMjYtMDhlNi00NDQzLWI3NDUtMzlmMzQ5MTJiMTYwIiwidCI6IjY3ZTY2NjE5LWMwMTAtNDVlZi05ZWJmLTY0OTI4OTUzNDE5YyJ9"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Productivity;
