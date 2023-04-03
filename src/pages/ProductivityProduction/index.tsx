import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';

import { Container, Row, Col } from 'react-bootstrap';
import GaugeChart from 'react-gauge-chart';
import { getMonth } from 'date-fns';
import animationData from '../../assets/fireworks.json';
import { Container as Cont } from './styles';
import { useFetch } from '../../hooks/useFetch';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

export interface Data {
  PRODUTO: string;
  DESCRICAO: string;
  QTD: number;
  MARGEM: number;
  MES_REAL: string;
  ANO_REAL: string;
  HOUR: number;
}

const products = [
  'AE105',
  'AE340',
  'APC10001',
  'B02M',
  'BEF',
  'BH05P',
  'BH05PREMAN',
  'BH05S',
  'BH05S2',
  'BH07S',
  'BH09S',
  'BKC03M',
  'BKC03MPROT',
  'CE25P',
  'CE25P10001',
  'CF20',
  'CG2010001',
  'CG25',
  'CG38',
  'CH250',
  'CH400',
  'CH400P',
  'CP420',
  'CP420S2',
  'DC20H',
  'EA66P',
  'ENC10001',
  'FA20H',
  'FA24H',
  'FA24H2',
  'GP120',
  'GS125',
  'GS165',
  'GS190',
  'GS230',
  'GS260',
  'MF100S2',
  'MF100S2E',
  'MF100S2E1000',
  'MF25P2',
  'MF25P2E',
  'MF25P2P',
  'MF25P2PE',
  'MF25S2',
  'MF25S2E',
  'MF40P2',
  'MF40P2E',
  'MF50P2',
  'MF50P2E',
  'MF75P2',
  'MF75P2E',
  'MF75S2',
  'MF75S2E',
  'MRA',
  'MRD',
  'MTL12',
  'MTL20',
  'MW46V',
  'PC20',
  'PFF-280',
  'PFF-280CIR90',
  'QC1000',
  'QC200',
  'QC400',
  'QC600',
  'QC800',
  'REMAN',
  'RPP10000',
  'SE08P',
  'SW25P',
  'SW25S',
  'VB45E',
  'VC66',
  'VL66P',
];

const hours = [
  { product: 'AE105', hours: 20 },
  { product: 'AE340', hours: 40 },
  { product: 'APC10001', hours: 120 },
  { product: 'B02M', hours: 113 },
  { product: 'BEF', hours: 160 },
  { product: 'BH05P', hours: 291 },
  { product: 'BH05PREMAN', hours: 106 },
  { product: 'BH05S', hours: 291 },
  { product: 'BH05S2', hours: 1100 },
  { product: 'BH07S', hours: 422 },
  { product: 'BH09S', hours: 1100 },
  { product: 'BKC03M', hours: 115 },
  { product: 'BKC03MPROT', hours: 113 },
  { product: 'CE25P', hours: 273 },
  { product: 'CE25P10001', hours: 20 },
  { product: 'CF20', hours: 48 },
  { product: 'CG2010001', hours: 360 },
  { product: 'CG25', hours: 120 },
  { product: 'CG38', hours: 120 },
  { product: 'CH250', hours: 28 },
  { product: 'CH400', hours: 28 },
  { product: 'CH400P', hours: 28 },
  { product: 'CP420', hours: 24 },
  { product: 'CP420S2', hours: 24 },
  { product: 'DC20H', hours: 100 },
  { product: 'EA66P', hours: 10 },
  { product: 'ENC10001', hours: 280 },
  { product: 'FA20H', hours: 100 },
  { product: 'FA24H', hours: 100 },
  { product: 'FA24H2', hours: 110 },
  { product: 'GP120', hours: 4 },
  { product: 'GS125', hours: 120 },
  { product: 'GS165', hours: 120 },
  { product: 'GS190', hours: 60 },
  { product: 'GS230', hours: 120 },
  { product: 'GS260', hours: 120 },
  { product: 'MF100S2', hours: 131 },
  { product: 'MF100S2E', hours: 131 },
  { product: 'MF100S2E1000', hours: 131 },
  { product: 'MF25P2', hours: 77 },
  { product: 'MF25P2E', hours: 77 },
  { product: 'MF25P2P', hours: 80 },
  { product: 'MF25P2PE', hours: 80 },
  { product: 'MF25S2', hours: 108 },
  { product: 'MF25S2E', hours: 108 },
  { product: 'MF40P2', hours: 108 },
  { product: 'MF40P2E', hours: 108 },
  { product: 'MF50P2', hours: 120 },
  { product: 'MF50P2E', hours: 120 },
  { product: 'MF75P2', hours: 128 },
  { product: 'MF75P2E', hours: 128 },
  { product: 'MF75S2', hours: 131 },
  { product: 'MF75S2E', hours: 131 },
  { product: 'MRA', hours: 360 },
  { product: 'MRD', hours: 360 },
  { product: 'MTL12', hours: 2400 },
  { product: 'MTL20', hours: 2600 },
  { product: 'MW46V', hours: 2400 },
  { product: 'PC20', hours: 304 },
  { product: 'PFF-280', hours: 48 },
  { product: 'PFF-280CIR90', hours: 48 },
  { product: 'QC1000', hours: 40 },
  { product: 'QC200', hours: 26 },
  { product: 'QC400', hours: 26 },
  { product: 'QC600', hours: 40 },
  { product: 'QC800', hours: 40 },
  { product: 'REMAN', hours: 60 },
  { product: 'RPP10000', hours: 560 },
  { product: 'SE08P', hours: 80 },
  { product: 'SW25P', hours: 360 },
  { product: 'SW25S', hours: 360 },
  { product: 'VB45E', hours: 89 },
  { product: 'VC66', hours: 20 },
  { product: 'VL66P', hours: 8 },
];

const ProductivityProduction: React.FC = () => {
  const mesAtual = `0${getMonth(new Date()) + 1}`.slice(-2);
  const [animationState, setAnimationState] = useState({
    isStopped: true,
    isPaused: true,
  });
  const { data } = useFetch<Data[]>(
    `ops?filial=0101&fechado=true&ano=2023&produto=${products.join("','")}`,
    {},
    6000,
  );
  const realizedHours = 9619.72;
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
    return <Loader />;
  }

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  hoursActualMonth = data
    .filter((dataItem: Data) => dataItem.MES_REAL === mesAtual)
    .map((dataItem: Data) => {
      const hour = hours.filter(item => item.product === dataItem.PRODUTO);
      const newItem = {
        ...dataItem,
        HOUR: hour[0].hours,
      };
      return newItem;
    })
    .reduce((acc: number, item: Data) => {
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
