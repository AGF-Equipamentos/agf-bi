import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

import { Container, Row, Col } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';
import { getMonth } from 'date-fns';
import animationData from '../../assets/fireworks.json';
import { Container as Cont } from './styles';
import { useFetch } from '../../hooks/useFetch';
import Header from '../../components/Header';

export interface Data {
  PRODUTO: string;
  DESCRICAO: string;
  QTD: number;
  MARGEM: number;
  MES_REAL: string;
  ANO_REAL: string;
}

const ProductivityProduction: React.FC = () => {
  const mesAtual = `0${getMonth(new Date()) + 1}`.slice(-2);
  const [animationState, setAnimationState] = useState({
    isStopped: true,
    isPaused: true,
  });
  const { data } = useFetch<Data[]>(
    `ops?filial=0101&fechado=true&ano=2021`,
    {},
    6000,
  );

  const realizedHours = 9576.4;
  let hoursActualMonth = 0;
  useEffect(() => {
    if (hoursActualMonth) {
      if (hoursActualMonth / realizedHours >= 0.7) {
        setAnimationState({
          isStopped: false,
          isPaused: false,
        });
      }
    }
  }, [hoursActualMonth, data]);

  if (!data) {
    return (
      <Container>
        <h1>Carregando...</h1>
      </Container>
    );
  }

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const hours = [
    { product: 'VC66', hours: 20 },
    { product: 'GP120', hours: 4 },
    { product: 'GS165', hours: 120 },
    { product: 'GS190', hours: 60 },
    { product: 'AE105', hours: 20 },
    { product: 'MF25P2', hours: 77 },
    { product: 'MF25P2E', hours: 77 },
    { product: 'MF75P2', hours: 128 },
    { product: 'MF75P2E', hours: 128 },
    { product: 'MF100S2', hours: 131 },
    { product: 'MF100S2E', hours: 131 },
    { product: 'VB45E', hours: 89 },
    { product: 'B02M', hours: 113 },
    { product: 'BKC03M', hours: 115 },
    { product: 'VL66P', hours: 8 },
    { product: 'BH05P', hours: 211 },
    { product: 'BH05S', hours: 211 },
    { product: 'CE25P10001', hours: 20 },
    { product: 'CE25P', hours: 273 },
    { product: 'MF25S2', hours: 108 },
    { product: 'MF25S2E', hours: 108 },
    { product: 'MF25P2P', hours: 80 },
    { product: 'MF25P2PE', hours: 80 },
    { product: 'AE340', hours: 40 },
    { product: 'MF75S2', hours: 131 },
    { product: 'MF75S2E', hours: 131 },
    { product: 'PFF-280', hours: 32 },
    { product: 'PFF-280CIR90', hours: 32 },
    { product: 'MF50P2', hours: 120 },
    { product: 'MF50P2E', hours: 120 },
    { product: 'REMAN', hours: 60 },
    { product: 'GS125', hours: 120 },
    { product: 'GS230', hours: 120 },
    { product: 'GS260', hours: 120 },
    { product: 'SE08P', hours: 80 },
    { product: 'CP420', hours: 24 },
    { product: 'CP420S2', hours: 24 },
    { product: 'CG38', hours: 120 },
    { product: 'CG25', hours: 120 },
    { product: 'EA66P', hours: 10 },
    { product: 'FA20H', hours: 100 },
    { product: 'MF40P2', hours: 108 },
    { product: 'MF40P2E', hours: 108 },
    { product: 'CH250', hours: 28 },
    { product: 'CH400', hours: 28 },
    { product: 'QC200', hours: 26 },
    { product: 'QC400', hours: 26 },
    { product: 'QC600', hours: 40 },
    { product: 'QC800', hours: 40 },
    { product: 'MW46V', hours: 2400 },
  ];

  const products = [
    'VC66',
    'GP120',
    'GS165',
    'GS190',
    'AE105',
    'MF25P2',
    'MF75P2',
    'MF100S2',
    'VB45E',
    'B02M',
    'BKC03M',
    'VL66P',
    'BH05P',
    'BH05S',
    'CE25P10001',
    'CE25P',
    'MF25S2',
    'MF25P2P',
    'AE340',
    'MF75S2',
    'PFF-280',
    'PFF-280CIR90',
    'MF50P2',
    'REMAN',
    'GS125',
    'GS230',
    'GS260',
    'SE08P',
    'CP420',
    'CP420S2',
    'CG38',
    'CG25',
    'EA66P',
    'FA20H',
    'MF40P2',
    'CH250',
    'CH400',
    'QC200',
    'QC400',
    'QC600',
    'QC800',
    'MW46V',
  ];

  hoursActualMonth = data
    .filter(
      (dataItem: Data) =>
        products.includes(dataItem.PRODUTO) && dataItem.MES_REAL === mesAtual,
    )
    .map((dataItem: Data) => {
      const hour = hours.filter(item => item.product === dataItem.PRODUTO);
      const newItem = {
        ...dataItem,
        HOUR: hour[0].hours,
      };
      return newItem;
    })
    .reduce((acc: number, item: any) => {
      return acc + item.HOUR;
    }, 0);

  return (
    <>
      <Lottie
        options={defaultOptions}
        height={600}
        width={600}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
        style={{ position: 'absolute', top: 25, right: 30 }}
      />
      <Lottie
        options={defaultOptions}
        height={600}
        width={600}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
        style={{ position: 'absolute', top: 25, left: 30 }}
      />
      <Header title="Produtividade" />

      <Cont>
        <Container fluid>
          <Col>
            <Row className="justify-content-center">
              <GaugeChart
                id="gauge-chart2"
                nrOfLevels={10}
                percent={hoursActualMonth / realizedHours}
                colors={['#cc3232', '#e7b416', '#2dc937']}
                animDelay={0}
                animateDuration={4000}
                style={{ width: '100%', maxWidth: '980px' }}
              />
            </Row>

            <Row>
              <Col>
                <h2>
                  Horas realizadas: <strong>{hoursActualMonth}</strong>
                </h2>
              </Col>
              <Col>
                <h2>
                  Horas totais: <strong>{realizedHours}</strong>
                </h2>
              </Col>
            </Row>
          </Col>
        </Container>
      </Cont>
    </>
  );
};

export default ProductivityProduction;
