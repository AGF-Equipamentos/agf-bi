import React from 'react';

import { Container } from './styles';
import { useFetch } from '../../hooks/useFetch';
import PivotTable from '../../components/PivotTable/index.js';
import Header from '../../components/Header';

export interface Data {
  PRODUTO: string;
  ANO: string;
  MES: string;
  QTD: number;
}

const SalesOutros: React.FC = () => {
  const { data } = useFetch<Data[]>(
    `fat?filial=0101&grupo=0050','0060','0070','0090','0094','0501','0502','0503','0520','0530','0540','0550','0560','0570&ano=2020,%202021,%202022`,
  );

  if (!data) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Vendas - Outros" />

      <PivotTable
        data={data}
        rows={['PRODUTO']}
        cols={['ANO', 'MES']}
        aggregatorName="Sum"
        vals={['QTD']}
      />
    </Container>
  );
};

export default SalesOutros;
