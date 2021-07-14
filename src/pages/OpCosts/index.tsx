import React, { useCallback, useEffect, useState } from 'react';

import PivotGrid, { FieldChooser } from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import {
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
  FormControl,
  Container,
} from 'react-bootstrap';
import { Container as Cont } from './styles';
import { useFetch } from '../../hooks/useFetch';
import Header from '../../components/Header';

export interface Data {
  PRODUTO: string;
  DESCRICAO: string;
  ANO: string;
  MES: string;
  QTD: number;
  GRUPO: number;
}

const OpCosts: React.FC = () => {
  const [productDescription, setProductDescription] = useState('');
  const { data } = useFetch<Data[]>(
    'op-costs?filial=0101&ano=2019,%202020,%202021',
  );
  const [dataSource, setDataSource] = useState<PivotGridDataSource>();
  const [filter, setFilter] = useState('Pesquisar pelo descrição');

  const handleSubmit = useCallback(() => {
    let newData;
    if (filter === 'Código') {
      newData = data.filter((item: Data) => {
        if (
          item.PRODUTO.includes(`${productDescription.toUpperCase().trim()}`)
        ) {
          return item;
        }
        return null;
      });
    } else {
      newData = data.filter((item: Data) => {
        if (
          item.DESCRICAO.includes(`${productDescription.toUpperCase().trim()}`)
        ) {
          return item;
        }
        return null;
      });
    }

    const dataSource2 = new PivotGridDataSource({
      fields: [
        {
          caption: 'PRODUTO',
          width: 120,
          dataField: 'PRODUTO',
          showTotals: false,
          area: 'row',
        },
        {
          caption: 'DESCRIÇÃO',
          width: 120,
          dataField: 'DESCRICAO',
          area: 'row',
          headerFilter: {
            allowSearch: true,
          },
        },
        {
          dataField: 'ANO',
          area: 'column',
        },
        {
          dataField: 'MES',
          area: 'column',
        },
        {
          caption: 'CUSTO',
          dataField: 'CUSTO_UN',
          dataType: 'number',
          format(data2: any) {
            return `${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(data2)}`;
          },
          summaryType: 'avg',
          area: 'data',
        },
      ],
      store: newData,
    });
    setDataSource(dataSource2);
  }, [data, filter, productDescription]);

  const dataSource2 = new PivotGridDataSource({
    fields: [
      {
        caption: 'PRODUTO',
        width: 120,
        dataField: 'PRODUTO',
        showTotals: false,
        area: 'row',
      },
      {
        caption: 'DESCRIÇÃO',
        width: 120,
        dataField: 'DESCRICAO',
        area: 'row',
        headerFilter: {
          allowSearch: true,
        },
      },
      {
        caption: 'GRUPO',
        width: 120,
        dataField: 'GRUPO',
        area: 'filter',
        filterType: 'include',
        filterValues: [
          '0010',
          '0080',
          '0094',
          '0500',
          '0501',
          '0502',
          '0503',
          '0510',
          '0520',
          '0540',
          '0550',
          '0560',
          '0570',
        ],
        headerFilter: {
          allowSearch: true,
        },
      },
      {
        caption: 'PRODUTO',
        width: 120,
        dataField: 'PRODUTO',
        area: 'filter',
        filterType: 'exclude',
        filterValues: [
          'BH05P01',
          'BH05P02',
          'BH05P03',
          'BH05P04',
          'BH05P05',
          'BH05P06',
          'BH05P07',
          'BH05P08',
        ],
        headerFilter: {
          allowSearch: true,
        },
      },
      {
        dataField: 'ANO',
        area: 'column',
      },
      {
        dataField: 'MES',
        area: 'column',
      },
      {
        caption: 'CUSTO',
        dataField: 'CUSTO',
        dataType: 'number',
        format(data2: any) {
          return `${new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(data2)}`;
        },
        summaryType: 'avg',
        area: 'data',
      },
    ],
    store: data,
  });

  useEffect(() => {
    setDataSource(dataSource2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const keyPressed = useCallback(
    (event: { key: string }): void => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  if (!data) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  return (
    <Cont>
      <Header title="Custo de Fabricação" />

      <Container fluid>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Filtrar pela descrição..."
            aria-label="Código do Produto"
            aria-describedby="basic-addon2"
            autoFocus
            onKeyPress={keyPressed}
            onChange={e => setProductDescription(e.target.value)}
          />
          <DropdownButton
            as={InputGroup.Append}
            variant="outline-warning"
            title={filter}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={() => setFilter('Descrição')}>
              Descrição
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Código')}>
              Código
            </Dropdown.Item>
          </DropdownButton>
          <InputGroup.Append>
            <Button
              variant="outline-warning"
              onClick={() => handleSubmit()}
              type="submit"
            >
              Enviar
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>

      <div id="pivot">
        <PivotGrid
          id="sales"
          dataSource={dataSource}
          allowSortingBySummary
          allowSorting
          allowFiltering
          allowExpandAll
          showBorders
        >
          <FieldChooser enabled />
        </PivotGrid>
      </div>
    </Cont>
  );
};

export default OpCosts;
