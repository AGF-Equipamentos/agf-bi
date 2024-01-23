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

const SalesMFs: React.FC = () => {
  const { data } = useFetch<Data[]>(
    'fat?filial=0101&grupo=0510&ano=2022,%202023,%202024',
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
      <Header title="Vendas - Máquinas à fio" />

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

export default SalesMFs;
