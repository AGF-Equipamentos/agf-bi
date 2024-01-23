import React, { useCallback, useEffect, useState } from 'react';

import PivotGrid, {
  FieldChooser,
  Scrolling,
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import {
  Button,
  DropdownButton,
  Dropdown,
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
  MARGEM: number;
}

const Margin: React.FC = () => {
  const [productDescription, setProductDescription] = useState('');
  const { data } = useFetch<Data[]>(
    'fat?filial=0101,0102&ano=2022,2023,2024&devolution=no',
    {},
    1000 * 60 * 60 * 3, // 3 hours,
  );
  const [dataSource, setDataSource] = useState<PivotGridDataSource>();
  const [dataFiltered, setDataFiltered] = useState(data);
  const [filter, setFilter] = useState('Pesquisar pelo código');

  const handleSubmit = useCallback(() => {
    let newData;
    if (filter === 'Descrição') {
      newData = data.filter((item: Data) => {
        if (
          item.DESCRICAO.includes(`${productDescription.toUpperCase().trim()}`)
        ) {
          return item;
        }
        return null;
      });
    } else {
      newData = data.filter((item: Data) => {
        if (
          item.PRODUTO.includes(`${productDescription.toUpperCase().trim()}`)
        ) {
          return item;
        }
        return null;
      });
    }

    setDataFiltered(newData);
  }, [data, filter, productDescription]);

  useEffect(() => {
    const lazyLoad = async (): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 500));
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
            caption: 'MARGEM',
            dataField: 'MARGEM',
            dataType: 'number',
            format(data2: any) {
              return `${Math.round((data2 + Number.EPSILON) * 100) / 100}%`;
            },
            summaryType: 'avg',
            area: 'data',
          },
          {
            caption: 'VALOR',
            dataField: 'VALOR',
            dataType: 'number',
            format(data2: any) {
              return `${new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(data2)}`;
            },
            summaryType: 'sum',
            area: 'data',
          },
        ],
        store: dataFiltered,
      });
      setDataSource(dataSource2);
    };

    lazyLoad();
  }, [dataFiltered]);

  const isDataCell = useCallback((cell: any): any => {
    return (
      cell.area === 'data' && cell.rowType === 'D' && cell.columnType === 'D'
    );
  }, []);

  const isTotalCell = useCallback((cell: any): any => {
    return (
      cell.type === 'T' ||
      cell.type === 'GT' ||
      cell.rowType === 'T' ||
      cell.rowType === 'GT' ||
      cell.columnType === 'T' ||
      cell.columnType === 'GT'
    );
  }, []);

  const getCssStyles = useCallback(({ fill, font, bold }: any): any => {
    return {
      'background-color': `#${fill}`,
      color: `#${font}`,
      'font-weight': bold ? 'bold' : undefined,
    };
  }, []);

  const getConditionalAppearance = useCallback(
    (cell: any): Record<string, any> => {
      if (isTotalCell(cell)) {
        return { fill: 'F2F2F2', font: '3F3F3F', bold: true };
      }

      const { value, text } = cell;
      if (text.includes('%') && value < 20) {
        return { font: '9C0006', fill: 'FFC7CE' };
      }
      if (text.includes('%') && value < 40) {
        return { font: '9C6500', fill: 'FFEB9C' };
      }
      return {};
    },
    [isTotalCell],
  );

  const onCellPrepared = useCallback(
    ({ cell, area, cellElement }: any): any => {
      const cellMod = cell;
      cellMod.area = area;

      if (isDataCell(cellMod) || isTotalCell(cellMod)) {
        const appearance = getConditionalAppearance(cellMod);
        Object.assign(cellElement.style, getCssStyles(appearance));
      }
    },
    [getConditionalAppearance, getCssStyles, isDataCell, isTotalCell],
  );

  // submit on press Enter
  const keyPressed = useCallback(
    (event: { key: string }): void => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  useEffect(() => {
    const lazyLoad = async (): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDataSource(
        new PivotGridDataSource({
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
              caption: 'MARGEM',
              dataField: 'MARGEM',
              dataType: 'number',
              format(data2: any) {
                return `${Math.round((data2 + Number.EPSILON) * 100) / 100}%`;
              },
              summaryType: 'avg',
              area: 'data',
            },
            {
              caption: 'VALOR',
              dataField: 'VALOR',
              dataType: 'number',
              format(data2: any) {
                return `${new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(data2)}`;
              },
              summaryType: 'sum',
              area: 'data',
            },
          ],
          store: data,
        }),
      );
    };

    lazyLoad();
  }, [data]);

  if (!data) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  return (
    <Cont>
      <Header title="Margem dos Produtos" />

      <Container fluid>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Filtrar pela descrição..."
            aria-label="Código do Produto"
            aria-describedby="basic-addon2"
            autoFocus
            onKeyPress={keyPressed}
            onChange={(e: any) => setProductDescription(e.target.value)}
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
          onCellPrepared={onCellPrepared}
          allowSortingBySummary
          allowSorting
          allowFiltering
          allowExpandAll
          showBorders
        >
          <FieldChooser enabled />
          <Scrolling mode="virtual" />
        </PivotGrid>
      </div>
    </Cont>
  );
};

export default Margin;
