import React, { useCallback, useEffect, useState } from 'react';

import PivotGrid, {
  FieldChooser,
  Scrolling,
  Export,
} from 'devextreme-react/pivot-grid';
import PivotGridDataSource, {
  PivotGridDataSourceField,
} from 'devextreme/ui/pivot_grid/data_source';
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
  FAT: number;
  ANO: string;
  MES: string;
  GRUPO: string;
  VENDEDOR: string;
  FAT_ACU: number;
}

const AccumulatedBySeller: React.FC = () => {
  const [productDescription, setProductDescription] = useState('');
  const { data } = useFetch<Data[]>(
    'group-fat-seller',
    {
      params: {
        year: ['2021', '2022', '2023', '2024'],
        branch: ['0101', '0102', '0103'],
      },
    },
    1000 * 60 * 60 * 3, // 3 hours,
  );
  const [dataSource, setDataSource] = useState<PivotGridDataSource>();
  const [dataFiltered, setDataFiltered] = useState(data);
  const [filter, setFilter] = useState('Pesquisar por vendedor');

  const handleSubmit = useCallback(() => {
    let newData;
    if (filter === 'Grupo') {
      newData = data.filter((item: Data) => {
        if (item.GRUPO.includes(`${productDescription.toUpperCase().trim()}`)) {
          return item;
        }
        return null;
      });
    } else {
      newData = data.filter((item: Data) => {
        if (
          item.VENDEDOR.includes(`${productDescription.toUpperCase().trim()}`)
        ) {
          return item;
        }
        return null;
      });
    }

    setDataFiltered(newData);
  }, [data, filter, productDescription]);

  const fields: PivotGridDataSourceField[] = [
    {
      caption: 'VENDEDOR',
      width: 120,
      dataField: 'VENDEDOR',
      showTotals: false,
      area: 'row',
    },
    {
      caption: 'GRUPO',
      width: 120,
      dataField: 'GRUPO',
      area: 'row',
      headerFilter: {
        allowSearch: true,
      },
    },
    {
      dataField: 'ANO',
      area: 'column',
      // expanded: true,
    },
    {
      dataField: 'MES',
      area: 'column',
    },
    {
      caption: 'VALOR',
      dataField: 'FAT_ACU',
      dataType: 'number',
      format(data2: any) {
        return `${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(data2)}`;
      },
      summaryType: 'sum',
      area: 'data',
      showGrandTotals: false,
    },
  ];

  useEffect(() => {
    const lazyLoad = async (): Promise<void> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const dataSource2 = new PivotGridDataSource({
        fields,
        store: dataFiltered,
      });
      setDataSource(dataSource2);
    };

    lazyLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          fields,
          store: data,
        }),
      );
    };

    lazyLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Header title="Acumulado 12 meses por Vendedor" />

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
            <Dropdown.Item onClick={() => setFilter('Vendedor')}>
              Vendedor
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter('Grupo')}>
              Grupo
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
          <Export enabled />
        </PivotGrid>
      </div>
    </Cont>
  );
};

export default AccumulatedBySeller;
