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

const SalesPolitrizes: React.FC = () => {
  const { data } = useFetch<Data[]>(
    `fat?filial=0101&grupo=0580&ano=2020,%202021,%202022`,
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
      <Header title="Vendas -  Politrizes e acessorios" />

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

export default SalesPolitrizes;
