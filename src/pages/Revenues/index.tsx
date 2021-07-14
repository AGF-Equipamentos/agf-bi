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
          src="https://app.powerbi.com/view?r=eyJrIjoiZWNiZDIyZWYtNWQzYS00Yjg0LTllZTEtMzc5NGNkNzUyOTFlIiwidCI6IjY3ZTY2NjE5LWMwMTAtNDVlZi05ZWJmLTY0OTI4OTUzNDE5YyJ9&pageName=ReportSectioneee129ed98772374c430"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </Cont>
  );
};

export default Revenues;
