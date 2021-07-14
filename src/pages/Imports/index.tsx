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
          src="https://app.powerbi.com/view?r=eyJrIjoiMzZlMzU0MDgtNDE4OC00ZDBjLWFhYTYtYThiZjlmMDc0NDY5IiwidCI6IjY3ZTY2NjE5LWMwMTAtNDVlZi05ZWJmLTY0OTI4OTUzNDE5YyJ9&pageName=ReportSectionbe68e27155d9c94702ce"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Imports;
